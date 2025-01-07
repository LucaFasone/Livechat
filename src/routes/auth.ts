import express, { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../db/query';
import { User, UserRegistration } from '../types';
import { comparePassword, generateRefreshToken, generateToken, hashPassword } from '../utils/authUtil';
import { redisFunctions } from '../db/redis';
const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, password, email } = req.body as UserRegistration;
    if (!username && !password && !email) {
        res.status(400).json({ message: "Please provide username, password and email" })
    }
    try {
        if (await findUserByEmail(email)) {
            res.status(400).json({ message: "User already exists please log in" })
        } else {
            const hashedPassword = await hashPassword(password)
            const user: User = await createUser(username, hashedPassword, email)
            user.token = generateToken({ id: user.id, email: user.email });
            user.password = null;
            const refreshToken = await generateRefreshToken({ id: user.id, email: user.email });
            res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none",  });
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
    }
    try {
        const user: User = await findUserByEmail(email);
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        if (!(await comparePassword(password, user.password!))) {
            res.status(400).json({ message: "Invalid password" });
        }
        user.token = generateToken({ id: user.id, email: user.email });
        user.password = null;
        const refreshToken = await generateRefreshToken({ id: user.id, email: user.email });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, sameSite: "lax", path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
        res.status(200).json({ message: "User logged in", user });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

export { router as authRouter };
