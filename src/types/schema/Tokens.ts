import mongoose, { InferSchemaType, Schema } from "mongoose";

const TokenSchema = new Schema({
    _id: { type: String, required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now,required:false} 
})

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export type TokenType = InferSchemaType<typeof TokenSchema> | null;

export const TokenModel = mongoose.model("Token", TokenSchema)

const TokenPasswordSchema = new Schema({
    _id: { type: String, required: true},
    createdAt: { type: Date, default: Date.now } 
})

TokenPasswordSchema.index({createdAt: 1},  { expireAfterSeconds: 3600 })

export type TokenPasswordType = InferSchemaType<typeof TokenPasswordSchema> | null;

export const TokenPasswordModel = mongoose.model("Password token", TokenPasswordSchema)