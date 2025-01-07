import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { redisFunctions } from '../db/redis';

const secretKey = process.env.JWT_SECRET!
const refresKey = process.env.JWT_REFRESH_SECRET!

const generateToken = (payload: JwtPayload, expiresIn = '1h') => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

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
const generateRefreshToken = (payload: JwtPayload) => {
    const refreshToken = jwt.sign(payload, refresKey, { expiresIn: '7d' });
    redisFunctions.saveRefreshToken(payload.id.toString(), refreshToken);
    return refreshToken;
}

export { generateToken, verifyToken, hashPassword, comparePassword, generateRefreshToken };

