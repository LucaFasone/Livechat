import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { TResponse } from "../types/responses";
import { ResponseErrorInternal, ResponseZodValidationError } from "../utils/expressResponse";
import { ZodError } from "zod";

export function expressHandler<T, Q, B,>(
    fn: (req: Request<ParamsDictionary, any, B, Q>) => Promise<TResponse<T>> | TResponse<T>
):
    (req: Request<ParamsDictionary, any, B, Q>, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
        try {
            const result = fn(req)
            if (result instanceof Promise) {
                result.catch((err) => {
                    if (err instanceof ZodError) {
                        return ResponseZodValidationError(err)
                    }
                    return ResponseErrorInternal(err)
                }).then((response) => response.apply(res))
                    .catch((err) => {
                        if (!res.headersSent) {
                            next(err)
                        }
                    })
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
            try {
                ResponseErrorInternal(e).apply(res)
            }
            catch (e) {
                if (!res.headersSent) {
                    next(e)
                }
            }

        }
    };
}