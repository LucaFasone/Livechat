import { Router } from 'express';
import passport from 'passport';
import { handleAuthenticatedError } from '../middleware/handleError';
import { expressHandler } from '../middleware/expressHandler';
import UserController from '../controllers/user';
import { generateRefreshTokenFromCookie } from '../middleware/getRefreshTokenFromCookie';
import { chatRouter } from './chat';

const router = Router();
router.use(generateRefreshTokenFromCookie)
router.use(passport.authenticate('bearer', { session: false, failWithError:true }));

router.use('/chat',chatRouter)

router.get('/me', expressHandler(UserController.me));

router.delete('/logout', expressHandler(UserController.logout))

router.use(handleAuthenticatedError)

export { router as profileRouter };