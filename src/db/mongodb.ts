import mongoose from "mongoose";
import { TokenModel, TokenType, TokenPasswordModel, TokenPasswordType } from "../types/schema/Tokens";
import { verifyResetPasswordToken, verifyToken } from "../utils/authUtil";
import { toAsyncHandler } from "../utils/toAsyncHandler";


mongoose.connect('mongodb://localhost:27017/livechat');


export const saveRefreshToken = async (userId: string, token: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenType>(() =>
        TokenModel.findByIdAndUpdate(
            userId,
            { token: token },
            {
                upsert: true,
                new: true,
                runValidators: true
            }));
    return tokenDoc ? tokenDoc.token : null
}
export const getRefreshToken = async (token: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenType>(() => TokenModel.findOne({token}))
    return tokenDoc ? verifyToken(tokenDoc.token, true) : null
}
export const deleteRefreshToken = async (userId: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenType>(() => TokenModel.findByIdAndDelete(userId))
    return tokenDoc ? verifyToken(tokenDoc.token) : null
}

export const saveResetPasswordToken = async (token: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenPasswordType>(() => new TokenPasswordModel({ _id: token }).save())
    return tokenDoc ? tokenDoc._id : null
}
export const getResetPasswordToken = async (token: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenPasswordType>(() => TokenPasswordModel.findById(token))
    return tokenDoc ? verifyResetPasswordToken(tokenDoc._id) : null
}
export const deleteResetPasswordToken = async (token: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenPasswordType>(() => TokenPasswordModel.findByIdAndDelete(token))
    return tokenDoc ? tokenDoc._id : null
} 