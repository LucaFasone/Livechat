import { Router } from 'express';

import { expressHandler } from '../middleware/expressHandler';
import UserController from '../controllers/user';
import { chatRouter } from './chat';

const router = Router();

router.use('/chat', chatRouter)
router.get('/me', expressHandler(UserController.me));
router.delete('/logout', expressHandler(UserController.logout))

export { router as profileRouter };