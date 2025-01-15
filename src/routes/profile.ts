import type { NextFunction,Response,Request } from 'express';
import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.get('/me',
    passport.authenticate('bearer', { session: false }),(req: Express.Request, res: Response): void => {
        console.log(req);
        const user = req.user;
        res.status(200).json(user);
    },(err: Error, req: Request, res:Response, _:NextFunction): void => {
        res.clearCookie('refreshToken');
        res.status(401).json({ message: err.message });
    }
);
export { router as profileRouter };
