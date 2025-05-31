export enum FunctionName {
    GetUsers = "get-users",
    SendNotification = "send-notification",
}

export const functionPaths: Record<FunctionName, string> = {
    [FunctionName.GetUsers]: "get-users",
    [FunctionName.SendNotification]: "send-notification",
};
export
    function isRunningOnRailway() {
    return !!process.env.RAILWAY_STATIC_URL || !!process.env.RAILWAY_ENVIRONMENT_NAME;  
}

export async function callFunction(fn: FunctionName, body: any, method: "GET" | "POST" | "PATCH" | "DELETE") {
    if (isRunningOnRailway()) {
        const url = `https://${process.env.RAILWAY_STATIC_URL}/api/${functionPaths[fn]}`;
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        console.log(res);
        
        return await res.json();
    } else {
   

    }
}