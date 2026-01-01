import React, { useEffect } from "react";
import { SocketDataContext } from "./SocketContext";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

const SocketContextProvider = ({ children }) => {
  useEffect(() => {
    const onConnect = () => {
      console.log("SOCKET CONNECTED:", socket.id);
    };

    const onDisconnect = () => {
      console.log("SOCKET DISCONNECTED");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketDataContext.Provider value={{ socket }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketContextProvider;
