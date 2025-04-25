import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export function createSocketServer(httpServer: HttpServer) {
  return new SocketIOServer(httpServer, {
    cors: { origin: "*" },
  });
}