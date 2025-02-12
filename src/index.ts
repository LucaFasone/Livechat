import express from 'express';
import { Socket } from 'socket.io';
import { createServer } from "http";
import { Server } from "socket.io";
import { router as IndexRouter } from './routes/index';
import { WsMessage, WsMessageAck } from './types';
import passport from 'passport';
import { authRouter } from './routes/auth';
import { profileRouter } from './routes/profile';
import cors from 'cors';
import coockieParser from 'cookie-parser';
import { generateRefreshTokenFromCookie } from './middleware/getRefreshTokenFromCookie';
import { createLog } from './middleware/logger';
import { bearerStrategy } from './middleware/passport';
import { oauth2Client, sendEmail } from './api/sendEmail';

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
passport.use(bearerStrategy);

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

app.get("/email", async (req, res) => {
    await sendEmail();
    res.send("Hello World")
});

app.get('/auth/google/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const { tokens } = await oauth2Client.getToken(code as string);
        oauth2Client.setCredentials(tokens);
        res.send('Authorization successful!');
    } catch (error) {
        console.error('Error during authentication:', error);
        res.send('Authentication failed!');
    }
});

httpServer.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});