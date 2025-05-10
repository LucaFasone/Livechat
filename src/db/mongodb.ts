import mongoose from "mongoose";
import { TokenModel, TokenType, TokenPasswordModel, TokenPasswordType } from "../types/schema/Tokens";
import { verifyResetPasswordToken, verifyToken } from "../utils/authUtil";
import { toAsyncHandler } from "../utils/toAsyncHandler";


mongoose.connect('mongodb://localhost:27017/livechat');


export const saveRefreshToken = async (userId: string, refreshToken: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenType>(() => new TokenModel({ _id: userId, refreshToken }).save())
    return tokenDoc ? tokenDoc.refreshToken : null
}
export const getRefreshToken = async (userId: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenType>(() => TokenModel.findById(userId))
    return tokenDoc ? verifyToken(tokenDoc.refreshToken, true) : null
}
export const deleteRefreshToken = async (userId: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenType>(() => TokenModel.findByIdAndDelete(userId))
    return tokenDoc ? verifyToken(tokenDoc.refreshToken) : null
}

export const saveResetPasswordToken = async (userId: string, refreshToken: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenPasswordType>(() => new TokenPasswordModel({ _id: userId, refreshToken }).save())
    return tokenDoc ? tokenDoc.resetPasswordToken : null
}
export const getResetPasswordToken = async (userId: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenPasswordType>(() => TokenPasswordModel.findById(userId))
    return tokenDoc ? verifyResetPasswordToken(tokenDoc.resetPasswordToken) : null
}
export const deleteResetPasswordToken = async (userId: string) => {
    const [tokenDoc, _] = await toAsyncHandler<TokenPasswordType>(() => TokenPasswordModel.findByIdAndDelete(userId))
    return tokenDoc ? tokenDoc.resetPasswordToken: null
} 