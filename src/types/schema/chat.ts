import { InferSchemaType, Schema, model } from "mongoose";
import { Contact } from "../../types";//use @ instead of ../.../

const chatSchema = new Schema({
    _id: { type: String, required: true },
    users: { type: Array<Contact>, required: true },
    updatedAt: { type: Date, default: Date.now, required: false }
})


export type ChatType = InferSchemaType<typeof chatSchema>;

export const ChatModel = model("chat", chatSchema)

