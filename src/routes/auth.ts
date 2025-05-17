import express, { Request, Response } from 'express';
import resetPasswordRouter from './resetpassword';
import { expressHandler } from '../middleware/expressHandler';
import AuthController from '../controllers/auth';

const router = express.Router();

router.use('/resetpassword', resetPasswordRouter)

router.post(
    '/register',
    expressHandler(AuthController.register)
);
router.post(
    '/login',
    expressHandler(AuthController.login)
);


export { router as authRouter };
