import type { NextFunction, Response, Request } from 'express';
import { Router } from 'express';
import passport from 'passport';
import { logout } from '../utils/authUtil';
import { UserWithoutPassword } from '../types';

const router = Router();

// (err, req, res) => {} should be a middleware function or something else in another file
router.get('/me', passport.authenticate('bearer', { session: false }), (req: Request, res: Response) => {
    const user = req.user as UserWithoutPassword;
    console.log(user);
    res.status(200).json(user);
}, (err: Error, req: Request, res: Response, _: NextFunction): void => {
    res.clearCookie("refreshToken");
    res.status(401).json({ message: err.message });
}
);
router.delete('/me', passport.authenticate('bearer', { session: false }), async (req: Request, res: Response) => {
    try {
        logout(req.user?.id!, res);
        res.status(200).json({ message: "Utente disconnesso" });
    } catch (error) {
        res.status(500).json({ message: "Errore nel logout" });
    }
}, (err: Error, req: Request, res: Response, _: NextFunction): void => {
    res.clearCookie("refreshToken");
    res.status(401).json({ message: err.message });
});

export { router as profileRouter };
