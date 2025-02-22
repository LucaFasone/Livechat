import { createTransport } from "nodemailer";
import "dotenv/config";
console.log(process.env.GMAIL_USER);
console.log(process.env.GMAIL_PASSWORD);
export const transport = createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});