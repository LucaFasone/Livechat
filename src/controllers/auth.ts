import { request, Request } from "express";
import { createUser, findFullUserByEmail, findUserByEmail } from "../db/query";
import { ResponseBadRequest, ResponseCustom, ResponseErrorAuthorization, ResponseSuccessJson } from "../utils/expressResponse";
import { UserRegistrationSchema } from "../types";
import { generateToken, hashPassword, setRefreshTokenCookie } from "../utils/authUtil";

export default class AuthController {
    static readonly register = async ({ body: { username, password, email } }: Request) => {
        if (!username || !password || !email) {
            return ResponseBadRequest("Please provide all fields")
        }
        if (await findUserByEmail(email)) {
            return ResponseBadRequest("User already exists, please log in")
        }

        UserRegistrationSchema.parse({ username, password, email });
        const hashedPassword = await hashPassword(password);
        const user = await createUser(username, hashedPassword, email);
        return ResponseCustom({ message: "User Created", user }, 201,
            (res) => setRefreshTokenCookie(res, { id: user.id, email: user.email }))
    }

    static readonly login = async ({ body: { email, password } }: Request) => {
        if (!email || !password) {
            return ResponseBadRequest("Please provide all fields")
        }
        UserRegistrationSchema.omit({ username: true }).parse({ email, password });
        const user = await findFullUserByEmail(email);
        if (!user) {
            return ResponseErrorAuthorization({ message: "User not found" })
        }
        user.token = generateToken({ id: user.id, email: user.email });
        return ResponseCustom({ user }, 200,
            (res) => setRefreshTokenCookie(res, { id: user.id, email: user.email }))

    }
}