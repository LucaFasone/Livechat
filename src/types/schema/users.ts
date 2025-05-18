import { InferSchemaType, model, Schema } from "mongoose";

const UserSchema = new Schema({
    _id: { type: String, required: true },
    status: {
        type: {
            type: String,
            enum: ['Online', 'lastSeen'],
            required: true,
        },
        lastSeen: {
            type: Date,
            required: function (this: UserType) { return this.status?.type === 'lastSeen'; },
        },
    },
    username: { type: String }
});

export type UserType = InferSchemaType<typeof UserSchema>

export const UserModel = model("user",UserSchema)