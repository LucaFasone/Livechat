import { Router } from "express";
import { authRouter } from "./auth";
import { profileRouter } from "./profile";
import { generateRefreshTokenFromCookie } from "../middleware/getRefreshTokenFromCookie";
import passport from "passport";

export const apiRouter = Router()

apiRouter.use("/auth", authRouter);
apiRouter.use("/profile", generateRefreshTokenFromCookie, passport.authenticate('bearer', { session: false }), profileRouter);