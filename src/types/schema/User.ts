import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema({
    userId: String,
    refreshToken: String,

})

export const TokenModel = mongoose.model("Token",TokenSchema)