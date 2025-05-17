import type { RequestHandler } from 'express';
import { generateToken, setRefreshTokenCookie, verifyToken } from '../utils/authUtil';
import { getRefreshToken } from '../db/mongodb';

export const generateRefreshTokenFromCookie: RequestHandler = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).json({ error: 'missing authorization header' });
            return;
        }
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new Error("Token non presente");
        }
        verifyToken(token);
        next();
    } catch (err) {
        const refreshToken = req.cookies['refreshToken'] as string;
        try {
            const decodedRefreshToken = await getRefreshToken(refreshToken);
            if (!decodedRefreshToken || typeof decodedRefreshToken !== "object") {
                res.status(401).json({ message: 'Refresh token non valido' });
                return;
            }
            const { id, email } = decodedRefreshToken;
            setRefreshTokenCookie(res, { id: id.toString(), email });
            req.newAccessToken = generateToken({ id: id.toString(), email });
            next();
        } catch (err) {
            res.status(401).json({ message: "Token invalid or missing" });
            return;
        }
    }
}