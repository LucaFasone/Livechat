import { NextFunction,Response,Request } from "express";

export const handleAuthenticatedError = (err: Error, req: Request, res: Response, _: NextFunction): void => {
    res.clearCookie("refreshToken");
    err.message ? res.status(401).json({ message: err.message }) : res.status(500).json({message:"Server Error"})
}