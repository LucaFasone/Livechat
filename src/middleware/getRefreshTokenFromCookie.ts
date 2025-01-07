import type { RequestHandler } from 'express';
import { generateRefreshToken, generateToken, verifyToken } from '../utils/authUtil';
import { JwtData } from '../types';
export const generateRefreshTokenFromCookie: RequestHandler = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    try {
        if (token === undefined) {
            throw new Error("Token non presente");
        }
        verifyToken(token);
        next();
    } catch (err) {
        const refreshToken = req.cookies['refreshToken'] as string;
        //verifica se il refreshToken è presente su redis
        try {
            const decodedRefreshToken = verifyToken(refreshToken, true) as JwtData;
            if (!decodedRefreshToken || typeof decodedRefreshToken !== "object") {
                res.status(401).json({ message: 'Refresh token non valido' });
                return;
            }
            const {id, email} = decodedRefreshToken;
            const newToken =  generateToken({ id, email });
            const newRefreshToken = generateRefreshToken({ id, email });
            console.log(newToken);
            console.log(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true, sameSite: "lax", path: "/",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            });
            res.setHeader('Authorization', `Bearer ${newToken}`);
            req.headers['authorization'] = `Bearer ${newToken}`;
            next();
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Errore nella verifica del token');
            res.status(401).json({ message: error.message });
            return;
        }
    }
}