import express from 'express';
import passport from 'passport';
import { User } from '../types';

const router = express.Router();

router.get('/me', passport.authenticate('bearer', { session: false }), (req, res) => {
    const user = req.user as User;
    res.json({ message: `Hello, ${user.username}!` });
});

export { router as profileRouter };
