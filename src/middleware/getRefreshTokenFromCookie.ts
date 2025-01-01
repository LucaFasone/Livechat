import type { RequestHandler } from 'express';
import { generateRefreshToken, generateToken, verifyToken } from '../utils/authUtil';
export const generateRefreshTokenFromCookie: RequestHandler = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    //check if refrehToken is inside the redis DB
    if (token) {
        try {
            verifyToken(token);
            return next();
        } catch (err) {
            const refreshToken = req.cookies['refreshToken'];
            if (!refreshToken) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            try {
                const decodedRefreshToken = verifyToken(refreshToken);
                if (!decodedRefreshToken || typeof decodedRefreshToken !== "object") {
                    res.status(401).json({ message: 'Refresh token non valido' });
                    return;
                }
                const newToken = generateToken(decodedRefreshToken);
                const newRefreshToken = generateRefreshToken(decodedRefreshToken);
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'none' });
                res.setHeader('Authorization', `Bearer ${newToken}`);
                return next();
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Errore nella verifica del token');
                res.status(401).json({ message: error.message });
                return;
            }
        }
    }
    res.status(401).json({ message: "Unauthorized" });
}