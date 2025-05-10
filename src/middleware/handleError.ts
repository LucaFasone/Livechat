import { NextFunction,Response,Request } from "express";
import { ZodError } from "zod";

export const handleAuthenticatedError = (err: Error, req: Request, res: Response, _: NextFunction) => {
    res.clearCookie("refreshToken");
    err.message ? res.status(401).json({ message: err.message }) : res.status(500).json({message:"Server Error"})
}

export const handleValidationError = (err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof ZodError) {
        const errors = err.errors.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
            expected: (issue as any).expected,
            received: (issue as any).received,
        }));
        res.status(400).json({ message: "Validation error", errors });
    } 
    else if (err instanceof Error){
        res.status(400).json({message: err.message})
    }
    else {
        res.status(500).json({ message: err || "Server Error" });
    }
};