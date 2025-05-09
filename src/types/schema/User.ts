import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema({
    userId: { type: String, required: false, unique: true },
    refreshToken: { type: String, required: false },
    passwordResetToken: { type: String, required: false },
    createdAt: { type: Date, default: Date.now } 
})

TokenSchema.index({ userId: 1 }, { unique: true });

TokenSchema.index({})

export const TokenModel = mongoose.model("Token", TokenSchema)