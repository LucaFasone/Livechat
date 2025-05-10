import { generateResetPasswordToken } from "../utils/authUtil";
import { emailTemplate } from "../utils/sendEmail";
import { validateEmail } from "../utils/user";
import { transport } from "./config";

export async function sendResetPasswordEmail(to: string, username: string,userId: string) {
    if (!await validateEmail(to)) {
        throw new Error("Invalid email");
    }
    const token = await generateResetPasswordToken(to,userId)
    if(!token){
        throw new Error("Invalid token")
    }
    const result = await transport.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject: "Reset Password",
        html: emailTemplate(username, token)
    });
    return result
}
