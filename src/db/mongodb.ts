import mongoose from "mongoose";
import { TokenModel } from "../types/schema/User";

mongoose.connect('mongodb://localhost:27017/livechat', {
});


const saveRefreshToken = async (userId: string, refreshToken: string) =>{
    new TokenModel({userId,refreshToken}).save()
    .then(()=>{
        return {userId,refreshToken}
    }).catch((e) =>{
        throw e instanceof Error ? e : new Error("Unknown Error")
    })
}
