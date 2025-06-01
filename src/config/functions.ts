import axios from "axios";

export enum FunctionName {
    GetUsers = "get-users",
}

export function isRunningOnRailway() {
    return !!process.env.RAILWAY_FUNCTION_URL || !!process.env.RAILWAY_ENVIRONMENT_NAME;
}
export async function callFunction(fn: FunctionName, body: any, method: "GET" | "POST" | "PATCH" | "DELETE" = "POST") {
    const url = `${process.env.RAILWAY_FUNCTION_URL}/${fn}`;
    const { data } = await axios({
        url,
        method,
        data: body
    })
    return data
}
