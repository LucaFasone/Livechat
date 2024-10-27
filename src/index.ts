import express, { Request, Response } from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import { router as IndexRouter } from './routes/index';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: [] } });

io.on("connection", (socket) => {
    console.log(socket.id);
});

app.use('/', IndexRouter);

httpServer.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});