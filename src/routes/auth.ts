import express, { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../db/query';
import { User, UserRegistration, UserRegistrationSchema } from '../types';
import { comparePassword, generateRefreshToken, generateToken, hashPassword, setRefreshTokenCookie } from '../utils/authUtil';
import { isValid, ZodError } from 'zod';
import { redisFunctions } from '../db/redis';
import resetPasswordRouter from './resetpassword';

const router = express.Router();

router.use('/resetpassword',resetPasswordRouter )

router.post('/register', async (req: Request, res: Response) => {
    const { username, password, email } = req.body as UserRegistration;
    if (!username && !password && !email) {
        res.status(400).json({ message: "Please provide username, password and email" })
    }
    try {
        if (await findUserByEmail(email)) {
            res.status(400).json({ message: "User already exists please log in" })
        } else {
            UserRegistrationSchema.parse({ username, password, email });
            const hashedPassword = await hashPassword(password);
            const user: User = await createUser(username, hashedPassword, email)
            user.token = generateToken({ id: user.id, email: user.email });
            setRefreshTokenCookie(res, { id: user.id.toString(), email: user.email });
            delete user.password;
            res.status(201).json({ message: "User created", user });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

export { router as authRouter };
