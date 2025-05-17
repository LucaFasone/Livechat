import { findUserById } from "../db/query";
import { verifyToken } from "../utils/authUtil";
import { Strategy as BearerStrategy } from 'passport-http-bearer';

const bearerStrategy = new BearerStrategy(
    { passReqToCallback: true },
    async (req: Express.Request, token: any, done: any) => {
        console.log("passport.ts: BearerStrategy callback eseguita");
        try {
            const actualToken = req.newAccessToken || token;
            console.log("passport.ts: actualToken:", actualToken);
            const decoded = verifyToken(actualToken);
            console.log("passport.ts: decoded:", decoded);
            if (!decoded || typeof decoded !== 'object') {
                console.log("passport.ts: Token non valido");
                return done(new Error('Token non valido'), false);
            }
            const userId = decoded.id;
            console.log("passport.ts: userId:", userId);
            if (!userId) {
                console.log("passport.ts: Token non contiene un ID valido");
                return done(new Error('Token non contiene un ID valido'), false);
            }
            const user = await findUserById(userId);
            console.log("passport.ts: user:", user);
            if (user === null) {                
                console.log("passport.ts: Utente non trovato");
                return done(new Error("Utente non trovato"), false);
            }
            console.log("passport.ts: Autenticazione riuscita");
            done(null, user);
        } catch (error) {
            console.log("passport.ts: Errore:", error);
            done(error, false);
        }
    }
);
export { bearerStrategy };