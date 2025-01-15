import express, { Request, Response } from 'express';
import { Socket } from 'socket.io';
import { createServer } from "http";
import { Server } from "socket.io";
import { router as IndexRouter } from './routes/index';
import { JwtData, User, WsMessage, WsMessageAck } from './types';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { verifyToken } from './utils/authUtil';
import { findUserById } from './db/query';
import { authRouter } from './routes/auth';
import { profileRouter } from './routes/profile';
import cors from 'cors';
import coockieParser from 'cookie-parser';
import { generateRefreshTokenFromCookie } from './middleware/getRefreshTokenFromCookie';
import { createLog } from './middleware/logger';
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: [] } });

io.on("connection", (socket: Socket) => {
    socket.on("message", (msg: WsMessage, ack: WsMessageAck) => {
        console.log("message", msg);
        ack("OK");
    })
});

app.use(coockieParser());
app.use(createLog);
passport.use(new BearerStrategy(
    { passReqToCallback: true },
    async (req: Express.Request, token: any, done: any) => {
        try {
            const actualToken = req.newAccessToken || token;
            const decoded = verifyToken(actualToken) as JwtData;
            
            if (!decoded || typeof decoded !== 'object') {
                return done(null, false, { message: 'Token non valido' });
            }
            const userId = decoded.id;
            if (!userId) {
                return done(new Error('Token non contiene un ID valido'), false);
            }
            const user = await findUserById(Number(userId));
            if (user === null) {                
                return done(new Error("Utete non trovato"), false);
            }
            return done(null, user);
        } catch (error) {
            console.error('Errore nella strategia Bearer:', error);
            return done(error, false);
        }
    })
);

app.use(express.json())
app.use(passport.initialize());
app.use(cors({
    origin: 'http://localhost:5173', //public url of the frontend 
    credentials: true,
    exposedHeaders: ['Authorization']

}));
app.use(['/profile'], generateRefreshTokenFromCookie);
app.use('/', IndexRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);



httpServer.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});