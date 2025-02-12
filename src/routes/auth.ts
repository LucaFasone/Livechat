import express, { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../db/query';
import { User, UserRegistration, UserRegistrationSchema } from '../types';
import { comparePassword, generateRefreshToken, generateToken, hashPassword, setRefreshTokenCookie } from '../utils/authUtil';
import { ZodError } from 'zod';
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
        const user: User = await findUserByEmail(email);
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
});
router.post("/resetpassword", async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        UserRegistrationSchema.pick({ email: true }).parse({ email })
        
        
        res.status(200).json({ message: "Reset password" })

    } catch (e) {
        e instanceof ZodError && res.status(400).json(e.errors[0].message);
        e instanceof Error && res.status(500).json(e.message);
    }


});
export { router as authRouter };
