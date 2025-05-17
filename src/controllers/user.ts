import type { Request } from 'express';
import { ResponseCustom, ResponseErrorAuthorization, ResponseSuccessJson } from '../utils/expressResponse';
import { logout } from '../utils/authUtil';
export default class UserController {
    static readonly me = (req: Request) => {
        const user = req.user
        if (!user) {
            return ResponseErrorAuthorization('Unauthorized');
        }
        return ResponseSuccessJson(user)
    }
    static readonly logout = ({ user }: Request) => {
        if (!user) {
            return ResponseErrorAuthorization('User not found')
        }
        return ResponseCustom({ message: "User Loggedout" }, 200, (res) => {
            logout(user.id, res)
        })
    }
}