import type { RequestHandler } from 'express';
import {generateToken, setRefreshTokenCookie, verifyToken } from '../utils/authUtil';
import { JwtData } from '../types';
import { getRefreshToken } from '../db/mongodb';
export const generateRefreshTokenFromCookie: RequestHandler = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (token === undefined) {
            throw new Error("Token non presente");
        }
        verifyToken(token);
        next();
    } catch (err) {
        const refreshToken = req.cookies['refreshToken'] as string;
        try {
            const decodedRefreshToken = verifyToken(refreshToken, true) as JwtData;
            const isRefreshTokenValid = await getRefreshToken(decodedRefreshToken.id.toString());

            if (!decodedRefreshToken || typeof decodedRefreshToken !== "object" || !isRefreshTokenValid) {
                res.status(401).json({ message: 'Refresh token non valido' });
                return;
            }
            const { id, email } = decodedRefreshToken;
            setRefreshTokenCookie(res, { id: id.toString(), email });
            req.newAccessToken = generateToken({ id: id.toString(), email });
            next();
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Errore nella verifica del token');
            res.status(401).json({ message: error.message });
            return;
        }
    }
}