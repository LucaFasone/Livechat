import {TResponseErrorInternal, TResponseSuccessJson } from "../types/responses";
import type { Response } from "express";
export function ResponseSuccessJson<T>(o: T, status = 200): TResponseSuccessJson<T> {
  return {
    apply: res => res.status(status).json(o),
    kind: 'ResponseSuccessJson',
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