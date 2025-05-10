import { Router } from "express";
import { ZodError } from "zod";
import { findUserByEmail } from "../db/query";
import { sendResetPasswordEmail } from "../smtp/sendResetPasswordEmail";
import { validateEmail } from "../utils/user";
import { verifyResetPasswordToken } from "../utils/authUtil";
import { getResetPasswordToken } from "../db/mongodb";

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
router.post("/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        if (!token) {
            throw new Error("Invalid token");
        }
        const decoded = await getResetPasswordToken(token);
        if(!decoded){
            throw new Error("Invalid token")
        }
        if (!password) {
            throw new Error("Please provide a password");
        }
        if (!await validateEmail(decoded.email)) {
            throw new Error("Invalid email");
        }
        const { id } = (await findUserByEmail(decoded.email))!;
        
        res.status(200).json({ result: true });
    } catch (e) {
        e instanceof Error ? res.status(500).json({ result: false, message: e.message }) : null
    }

});
export default router;