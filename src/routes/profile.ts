import express from 'express';
import passport from 'passport';
import { User } from '../types';

const router = express.Router();

router.get('/me', passport.authenticate('bearer', { session: false }), (req, res) => {
    console.log("profile")
    console.log(req.headers);
    res.status(200).send()
});

export { router as profileRouter };
