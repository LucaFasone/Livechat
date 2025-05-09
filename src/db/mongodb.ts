import mongoose from "mongoose";
import { TokenModel } from "../types/schema/User";
import { verifyToken } from "../utils/authUtil";

mongoose.connect('mongodb://localhost:27017/livechat', {
});


const saveRefreshToken = async (userId: string, refreshToken: string) => {
    new TokenModel({ userId, refreshToken }).save()
        .then(() => {
            return { userId, refreshToken }
        }).catch((e) => {
            throw e instanceof Error ? e : new Error("Unknown Error")
        })
}
const getRefreshToken = async (userId: string) => {
    const { refreshToken } = await TokenModel.findOne({ userId }) || {}
    if (!refreshToken) {
        return null
    }
    try {
        const verifiedToken = verifyToken(refreshToken)
        return verifiedToken
    } catch (e) {
        return null
    }
}