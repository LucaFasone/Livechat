import { Request } from 'express';
import { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
//need to use zod 
export type wsMessage = {
    type: string;
    data: any;
    roomId?: number | string;
    userId?: number | string;
}
export type wsMessageAck = (status: "OK" | "NOT OK") => void

export type User = {
    id: number;
    username: string;
    email: string;
    password: string | null;
    token?: string;
}

export type UserRegistration = {
    username: string;
    email: string;
    password: string; 
};

export interface AuthenticatedRequest extends Request {
    user?: User;
}

//sostiure con JwtPayload che ce ora
export interface JwtData extends DefaultJwtPayload {
    id: string;
    email: string;
}
