import { createTransport } from "nodemailer";
import "dotenv/config";

export const transport = createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});