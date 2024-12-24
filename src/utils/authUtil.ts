import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const secretKey = process.env.JWT_SECRET!

const generateToken = (payload: JwtPayload, expiresIn = '1h') => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Token non valido o scaduto');
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


export { generateToken, verifyToken, hashPassword, comparePassword };

