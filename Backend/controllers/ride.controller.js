const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/map.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2000
    );
    console.log("Captains in radius:", captainsInRadius);

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    // Attempt delivery only to currently connected sockets
    let attempted = captainsInRadius.length;
    let delivered = 0;

    for (const captain of captainsInRadius) {
      if (!captain?.socketId) continue;
      try {
        const ok = sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: rideWithUser,
        });
        if (ok) delivered++;
      } catch (err) {
        console.error("Error sending new-ride to captain:", err.message || err);
      }
    }

    console.log(`Attempted new-ride to ${attempted} captains, delivered to ${delivered}`);

    // Fallback: if none delivered, notify other active captains with socketIds
    if (delivered === 0) {
      console.log("No connected captains in radius — falling back to active captains with socketIds");
      const captainModel = require("../models/captain.model");
      const fallbackCaptains = await captainModel.find({
        status: "active",
        socketId: { $exists: true },
      });

      let fallbackDelivered = 0;
      for (const captain of fallbackCaptains) {
        if (!captain?.socketId) continue;
        try {
          const ok = sendMessageToSocketId(captain.socketId, {
            event: "new-ride",
            data: rideWithUser,
          });
          if (ok) fallbackDelivered++;
        } catch (err) {
          console.error("Error sending fallback new-ride:", err.message || err);
        }
      }

      console.log(`Fallback attempt sent to ${fallbackCaptains.length} captains, delivered to ${fallbackDelivered}`);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    // Send to the user (who is connected)
    if (ride.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-confirmed",
        data: ride,
      });
      console.log("✅ Event sent to user:", ride.user.socketId);
    } else {
      console.log("⚠️ User socketId not found! Trying fresh DB fetch...");

      try {
        const userModelFresh = require("../models/user.model");
        const freshUser = await userModelFresh.findById(ride.user._id);
        console.log("Fetched user for socket check:", freshUser?.socketId);

        if (freshUser?.socketId) {
          sendMessageToSocketId(freshUser.socketId, {
            event: "ride-confirmed",
            data: ride,
          });
          console.log("✅ Event sent to user (from fresh fetch):", freshUser.socketId);
        } else {
          console.log("⚠️ Still no socketId for user");
        }
      } catch (err) {
        console.error("Error fetching user for socketId:", err.message || err);
      }
    }

    // Optionally, notify the captain that the ride was confirmed (not required by user)
    if (ride.captain?.socketId) {
      sendMessageToSocketId(ride.captain.socketId, {
        event: "ride-confirmed-captain",
        data: ride,
      });
    }

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    console.log(ride);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
