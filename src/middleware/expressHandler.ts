import { Request, Response, NextFunction, response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { TResponse } from "../types/responses";
import { ResponseErrorInternal } from "../utils/expressResponse";
import { ne } from "drizzle-orm";

export function expressHandler<T, Q, B,>(
    fn: (req: Request<ParamsDictionary, any, B, Q>) => Promise<TResponse<T>> | TResponse<T>
):
    (req: Request<ParamsDictionary, any, B, Q>, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
        try {
            const result = fn(req)
            if (result instanceof Promise) {
                result.catch((err) =>
                    ResponseErrorInternal(err))
                    .then((response) => response.apply(res))
                    .catch((err) => {
                        if (!res.headersSent) {
                            next(err)
                        }
                    }
                    )
            } else {
                try {
                    result.apply(res)
                } catch (error) {
                    if (!res.headersSent) {
                        next(error)
                    }
                }
            }
        } catch (e) {
            try{
                ResponseErrorInternal(e).apply(res)
            }
            catch(e){
                if(!res.headersSent){
                    next(e)
                }
            }

        }
    };
}