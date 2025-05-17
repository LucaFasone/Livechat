import type { Response } from "express";

export type TResponse<T> = {
    readonly kind: T;
    readonly status: number;
    readonly apply: (response: Response) => void;
}
export type TResponseSuccessJson<T> = TResponse<'ResponseSuccessJson'> & {
    value: T;
};

export type TResponseErrorInternal = TResponse<'ResponseErrorInternal'> & {
    value?: any;
};
export type TResponseBadRequest<T> = TResponse<'ResponseBadRequest'> & {
    value: T;
};
export type TResponseErrorAuthorization<T = string> = TResponse<'ResponseErrorAuthorization'> & {
    value?: T;
}

export type TResponseCustom<T> = TResponse<'ResponseCustom'> & {
  value: T;
};