import { redisFunctions } from "../db/redis";
import { UserWithoutPassword } from "../types";
import { generateResetPasswordToken } from "./authUtil";


export const emailTemplate = (username: string, token: string) =>
    `
    <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #007bff;">Livechat - Reset Password</h2>
            <p>Hello <strong>${username}</strong>,</p>
            <p>You requested a password reset. If you did not request this, please ignore this email.</p>
            <p>Click on the button below to reset your password:</p>
            <p>
                <a href="http://localhost:5173/resetpassword?token=${token}" 
                    style="display: inline-block; padding: 10px 20px; color: white; background: #007bff; text-decoration: none; border-radius: 5px;">
                    Reset Password
                </a>
            </p>
            <p>If the button doesn't work, you can use this link:</p>
            <p><a href="http://localhost:5173/resetpassword?token=${token}">http://localhost:5173/resetpassword?token=${token}</a></p>
            <hr />
            <p style="font-size: 12px; color: gray;">If you didn't request this, you can ignore this email.</p>
        </body>
    </html>
`;


