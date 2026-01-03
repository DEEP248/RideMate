const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log("JOIN received:", { userId, userType, socketId: socket.id });

      try {
        if (userType === "user") {
          const updated = await userModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );
          console.log("Updated user socketId:", updated?.socketId);
        } else if (userType === "captain") {
          // Mark captain as online when they join
          const updated = await captainModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id, status: "active" },
            { new: true }
          );
          console.log("Updated captain socketId and status:", updated?.socketId, updated?.status);
        }
      } catch (err) {
        console.error("Error updating socketId on join:", err.message || err);
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);

      try {
        // Clear socketId for a matching user (if any)
        const clearedUser = await userModel.findOneAndUpdate(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );
        if (clearedUser) console.log("Cleared socketId for user:", clearedUser._id);

        // Clear socketId and mark captain inactive if a captain was connected with this socket
        const clearedCaptain = await captainModel.findOneAndUpdate(
          { socketId: socket.id },
          { $unset: { socketId: "" }, status: "inactive" },
          { new: true }
        );
        if (clearedCaptain) console.log("Cleared socketId and set captain inactive:", clearedCaptain._id);
      } catch (err) {
        console.error("Error clearing socketId on disconnect:", err.message || err);
      }
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log("Attempting to send", messageObject.event, "to", socketId);

  if (!io) {
    console.log("Socket.io not initialized.");
    return false;
  }

  // Check whether the socket id is currently connected
  const sock = io.sockets.sockets.get(socketId);
  if (sock) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
    console.log("✅ Emitted", messageObject.event, "to", socketId);
    return true;
  }

  // Socket is not connected — clean up stale socketId in DB asynchronously
  console.log("⚠️ Socket id not connected (stale):", socketId);
  (async () => {
    try {
      const clearedUser = await userModel.findOneAndUpdate(
        { socketId },
        { $unset: { socketId: "" } }
      );
      if (clearedUser) console.log("Cleared stale socketId from user:", clearedUser._id);

      const clearedCaptain = await captainModel.findOneAndUpdate(
        { socketId },
        { $unset: { socketId: "" } }
      );
      if (clearedCaptain) console.log("Cleared stale socketId from captain:", clearedCaptain._id);
    } catch (err) {
      console.error("Error clearing stale socketId:", err.message || err);
    }
  })();

  return false;
};

module.exports = { initializeSocket, sendMessageToSocketId };