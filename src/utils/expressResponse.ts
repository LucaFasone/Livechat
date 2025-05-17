import { TResponse, TResponseBadRequest, TResponseCustom, TResponseErrorAuthorization, TResponseErrorInternal, TResponseSuccessJson } from "../types/responses";
import type { Response } from "express";
export function ResponseSuccessJson<T>(o: T, status = 200): TResponseSuccessJson<T> {
  return {
    apply: res => res.status(status).json(o),
    kind: 'ResponseSuccessJson',
    status,
    value: o,
  };
}

export function ResponseBadRequest<T>(o: T, status = 400): TResponseBadRequest<T> {
  return {
    apply: res => res.status(status).json(o),
    kind: 'ResponseBadRequest',
    status,
    value: o,
  };
}

export function ResponseErrorInternal(
  error?: any,
  status = 500,
  message = 'Internal Server Error'
): TResponseErrorInternal {
  return {
    apply: (res: Response) =>
      res.status(status).json({
        message,
        error,
      }),
    kind: 'ResponseErrorInternal',
    status,
    value: error,
  };
}
export function ResponseErrorAuthorization<T>(
  error: T,
  status = 401,
  message = 'Not Authorized',
): TResponseErrorAuthorization<T> {
  return {
    apply: (res: Response) =>
      res.status(status).json({
        message, error
      }),
    kind: "ResponseErrorAuthorization",
    status,
    value: error,
  }
}
export function ResponseCustom<T>(
  value: T,
  status: number,
  beforeSend:(res:Response) => any
): TResponseCustom<T>{
  return{
    apply: (res:Response)=>{
      beforeSend(res)
      res.status(status).json(value)
    },
    kind: 'ResponseCustom',
    status,
    value
  }
}