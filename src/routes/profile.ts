import express from 'express';
import passport from 'passport';
import { User } from '../types';

const router = express.Router();

router.get('/me', passport.authenticate('bearer', { session: false }), (req, res) => {
    console.log("profile")
    res.status(200).json((req.user as User));
});
export { router as profileRouter };
