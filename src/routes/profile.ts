import type { NextFunction, Response, Request } from 'express';
import { Router } from 'express';
import passport from 'passport';
import { logout } from '../utils/authUtil';
import { UserWithoutPassword } from '../types';
import { handleAuthenticatedError } from '../middleware/handleError';
import { expressHandler } from '../middleware/expressHandler';
import { generateRefreshTokenFromCookie } from '../middleware/getRefreshTokenFromCookie';

const router = Router();

router.use(generateRefreshTokenFromCookie)

router.use(passport.authenticate('bearer', { session: false, failWithError: true }));

router.get('/me', expressHandler(async (req: Request, res: Response) => {
    const user = req.user as UserWithoutPassword;
    res.status(200).json(user);
}));

router.delete('/logout', expressHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error("User Not Found");
    }
    logout(req.user.id, res);
    res.status(200).json({ message: "Utente disconnesso" });
}));

router.post('/add-user', expressHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new Error("User Not Found");
    }
    const { recipientId } = req.body;
    // await addUserToReachableUsers(req.user.id, recipientId);
    res.status(200).json({ message: "User added successfully" });
}));

router.use(handleAuthenticatedError);

export { router as profileRouter };