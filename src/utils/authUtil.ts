import jwt, { JwtPayload } from 'jsonwebtoken';
import type { Response } from 'express';

import 'dotenv/config';
import bcrypt from 'bcrypt';
import { JwtData } from '../types';
import { deleteRefreshToken, saveRefreshToken, saveResetPasswordToken } from '../db/mongodb';

const secretKey = process.env.JWT_SECRET!
const refresKey = process.env.JWT_REFRESH_SECRET!
const resetPasswordKey = process.env.JWT_REFRESH_SECRET!

const generateToken = (payload: JwtPayload, expiresIn = '1h') => {
    return jwt.sign(payload, secretKey, { expiresIn });
};
const generateResetPasswordToken = async (email: string, id: string) => {
    const token = jwt.sign({ email }, resetPasswordKey, { expiresIn: '1h' });
    const savedToken = await saveResetPasswordToken(id, token)
    return savedToken
}
const verifyResetPasswordToken = (token: string) => {
    try {
        
        return jwt.verify(token, resetPasswordKey);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token scaduto');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token non valido');
        }
        throw new Error('Errore nella verifica del token');
    }
}
const verifyToken = (token: string, verifyRefresh = false) => {
    try {
        return jwt.verify(token, verifyRefresh ? refresKey : secretKey);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token scaduto');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token non valido');
        }
        throw new Error('Errore nella verifica del token');
    }
};

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};
const generateRefreshToken = (payload: JwtData) => {
    const refreshToken = jwt.sign(payload, refresKey, { expiresIn: '7d' });
    saveRefreshToken(payload.id, refreshToken)
    return refreshToken;
}
const setRefreshTokenCookie = (res: Response, payload: JwtData): string => {
    const refreshToken = generateRefreshToken(payload);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return refreshToken;
};

const logout = (id: string, res: Response) => {
    deleteRefreshToken(id)
    res.clearCookie("refreshToken");
};
export { generateToken, verifyToken, hashPassword, comparePassword, generateRefreshToken, setRefreshTokenCookie, logout, generateResetPasswordToken, verifyResetPasswordToken };



