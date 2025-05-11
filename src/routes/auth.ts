import express, { Request, Response } from 'express';
import { createUser, findFullUserByEmail, findUserByEmail } from '../db/query';
import { User, UserRegistration, UserRegistrationSchema, UserWithoutPassword } from '../types';
import { comparePassword, generateRefreshToken, generateToken, hashPassword, setRefreshTokenCookie } from '../utils/authUtil';
import resetPasswordRouter from './resetpassword';
import { handleValidationError } from '../middleware/handleError';
import { expressHandler } from '../middleware/expressHandler';

const router = express.Router();

router.use('/resetpassword', resetPasswordRouter)

router.post(
    '/register',
    expressHandler(async (req: Request, res: Response) => {
        const { username, password, email } = req.body as UserRegistration;
        if (!username || !password || !email) {
            throw new Error("Please provide username, password, and email");
        }
        if (await findUserByEmail(email)) {
            throw new Error("User already exists, please log in");
        }
        UserRegistrationSchema.parse({ username, password, email });
        const hashedPassword = await hashPassword(password);
        const user = await createUser(username, hashedPassword, email);
        user.token = generateToken({ id: user.id, email: user.email });
        setRefreshTokenCookie(res, { id: user.id, email: user.email });
        delete user.password;
        res.status(201).json({ message: "User created", user });
    })
);


router.post(
    '/login',
    expressHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body as UserRegistration;
        if (!email || !password) {
            throw new Error("Please provide email and password");
        }
        UserRegistrationSchema.omit({ username: true }).parse({ email, password });
        const user = await findFullUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        if (!(await comparePassword(password, user.password!))) {
            throw new Error("Invalid password");
        }

        user.token = generateToken({ id: user.id, email: user.email });
        setRefreshTokenCookie(res, { id: user.id.toString(), email: user.email });
        delete user.password;
        res.status(200).json({ message: "User logged in", user });
    })
);


export { router as authRouter };
