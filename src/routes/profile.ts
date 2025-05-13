import type { Response, Request } from 'express';
import { Router } from 'express';
import passport from 'passport';
import { logout } from '../utils/authUtil';
import { UserWithoutPassword } from '../types';
import { handleAuthenticatedError } from '../middleware/handleError';
import { expressHandler } from '../middleware/expressHandler';
import UserController from '../controllers/user';

const router = Router();

router.use(passport.authenticate('bearer', { session: false }));

router.get('/me', expressHandler(UserController.me));

router.delete('/logout', expressHandler(UserController.logout))

router.use(handleAuthenticatedError)

export { router as profileRouter };