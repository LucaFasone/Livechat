import express, { Request, Response } from 'express';
import { createUser, findFullUserByEmail, findUserByEmail } from '../db/query';
import { User, UserRegistration, UserRegistrationSchema, UserWithoutPassword } from '../types';
import { comparePassword, generateRefreshToken, generateToken, hashPassword, setRefreshTokenCookie } from '../utils/authUtil';
import resetPasswordRouter from './resetpassword'; 

const router = express.Router();

router.use('/resetpassword', resetPasswordRouter)

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

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body as UserRegistration;
    if (!email && !password) {
        res.status(400).json({ message: "Please provide email and password" });
        throw new Error("Please provide email and password");
    }
    try {
        UserRegistrationSchema.omit({ username: true }).parse({ email, password });
        const user = await findFullUserByEmail(email);
        if (!user) {
            res.status(400).json({ message: "User not found" });
            throw new Error("User not found");
        }
        if (!(await comparePassword(password, user.password!))) {
            res.status(400).json({ message: "Invalid password" });
            throw new Error("Invalid password");
        }

        user.token = generateToken({ id: user.id, email: user.email });
        setRefreshTokenCookie(res, { id: user.id.toString(), email: user.email });
        delete user.password;
        res.status(200).json({ message: "User logged in", user });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
})

export { router as authRouter };
