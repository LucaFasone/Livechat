import { findUserById } from "../db/query";
import { verifyToken } from "../utils/authUtil";
import { Strategy as BearerStrategy } from 'passport-http-bearer';

const bearerStrategy = new BearerStrategy(
    { passReqToCallback: true },
    async (req: Express.Request, token: any, done: any) => {
        try {
            const actualToken = req.newAccessToken || token;
            const decoded = verifyToken(actualToken);
            if (!decoded || typeof decoded !== 'object') {
                return done(null, false, { message: 'Token non valido' });
            }
            const userId = decoded.id;
            if (!userId) {
                return done(new Error('Token non contiene un ID valido'), false);
            }
            const user = await findUserById(userId);
            if (user === null) {                
                return done(new Error("Utete non trovato"), false);
            }
            return done(null, user);
        } catch (error) {
            console.error('Errore nella strategia Bearer:', error);
            return done(error, false);
        }
    })
export { bearerStrategy };