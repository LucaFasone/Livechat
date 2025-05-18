import { addUsersToReacheable } from "../db/mongodb"
import { userExits } from "../db/query"
import { ResponseBadRequest, ResponseSuccessJson } from "../utils/expressResponse"
import { Request } from "express"

export default class ChatController {
    static readonly add = async ({ body: { ids }, user }: Request<{}, any, { ids: string[] }>) => {
        const existenceChecks = (await Promise.all(ids.map(id => userExits(id)))).includes(false)

        if (existenceChecks) {
            return ResponseBadRequest("Users dont exits")
        }
        await addUsersToReacheable(ids, user!.id)
        return ResponseSuccessJson("User added")

    }
}