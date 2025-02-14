import { gmail } from "../api/gmail";
import { UserWithoutPassword } from "../types";


export const sendResetPasswordEmail = async (to: string, user: UserWithoutPassword) => {
    const emailBody = `
    <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #007bff;">Livechat - Reset Password</h2>
            <p>Hello <strong>${user.username}</strong>,</p>
            <p>You requested a password reset. If you did not request this, please ignore this email.</p>
            <p>Click on the button below to reset your password:</p>
            <p>
                <a href="http://localhost:5173/resetpassword" 
                    style="display: inline-block; padding: 10px 20px; color: white; background: #007bff; text-decoration: none; border-radius: 5px;">
                    Reset Password
                </a>
            </p>
            <p>If the button doesn't work, you can use this link:</p>
            <p><a href="http://localhost:5173/resetpassword">http://localhost:5173/resetpassword</a></p>
            <hr />
            <p style="font-size: 12px; color: gray;">If you didn't request this, you can ignore this email.</p>
        </body>
    </html>
`;
    const email = [
        `From: "Livechat Team" <luca.fasone1@gmail.com>`,
        `To: ${to}`,
        `Subject: Livechat Reset Password`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset="UTF-8"`,
        ``,
        emailBody, // Il corpo dell'email in HTML
    ].join("\n");

    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
        },
    })
    return res.status
}