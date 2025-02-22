import { Router } from "express";
import { UserRegistrationSchema } from "../types";
import { ZodError } from "zod";
import { findUserByEmail } from "../db/query";
import { sendResetPasswordEmail } from "../smtp/sendResetPasswordEmail";
import { validateEmail } from "../utils/user";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { to } = req.body;
        if (!to) {
            throw new Error("Please provide an email");
        }
        const user = await findUserByEmail(to);
        if (user) {
            sendResetPasswordEmail(to, user.username);
        }
        res.status(200).json({ message: "Email sent if user exits" });
    } catch (e) {
        e instanceof ZodError ? res.status(400).json({ message: e.errors }) : res.status(500).json({ message: "Internal server error" });
    }
});
export default router;