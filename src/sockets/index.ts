import { Server as SocketIOServer } from "socket.io";
import { registerMessage } from "./registerMessage";
import { joinSocketRooms } from "./joinSocketRoom";

export function registerSocketHandlers(io: SocketIOServer) {
  io.on("connection", (socket) => {
    console.log("Nuova connessione:", socket.id);
    
    registerMessage(socket)
    joinSocketRooms(socket)

    socket.on("disconnect", () => {
      console.log("Socket disconnesso:", socket.id);
    });
  });
}