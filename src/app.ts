import express  from 'express';
import { Socket } from 'socket.io';
import { createServer } from "http";
import { Server } from "socket.io";
import passport from 'passport';
import { authRouter } from './routes/auth';
import { profileRouter } from './routes/profile';
import cors from 'cors';
import coockieParser from 'cookie-parser';
import { generateRefreshTokenFromCookie } from './middleware/getRefreshTokenFromCookie';
import { createLog } from './middleware/logger';
import { bearerStrategy } from './middleware/passport';
import { createSocketServer } from './config/socket';
import { registerSocketHandlers } from './sockets/index';

const app = express()
const httpServer = createServer(app)
export const io = createSocketServer(httpServer);

app.use(coockieParser());
app.use(createLog);
passport.use(bearerStrategy);

app.use(express.json())
app.use(passport.initialize());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    exposedHeaders: ['Authorization']
}));

app.use(['/profile'], generateRefreshTokenFromCookie);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);


httpServer.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
    registerSocketHandlers(io);

});