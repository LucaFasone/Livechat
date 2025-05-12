import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { TResponse } from "../types/responses";
import { ResponseErrorInternal } from "../utils/expressResponse";

export function expressHandler<
    T,
    P = ParamsDictionary,
    ReqBody = any,
    ReqQuery = any>(fn: (req: Request<P, any, ReqBody, ReqQuery>) => Promise<TResponse<T>>):
    (req: Request<P, any, ReqBody, ReqQuery>, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
        fn(req)
            .catch((err)=> {
                return ResponseErrorInternal(err);
            })
            .then((response) => {
                response.apply(res);
            })
            .catch((finalError) => {
                if (!res.headersSent) {
                    next(finalError);
                }
            }
        );
    };
}