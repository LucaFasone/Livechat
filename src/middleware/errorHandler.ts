import { Request, Response, NextFunction } from "express";

export const expressHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(error => {
            console.error("Error from expressHandler:", error);
            next(error);
        });
    };
};