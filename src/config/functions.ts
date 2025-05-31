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
        const url = `${process.env.RAILWAY_STATIC_URL}/api/${functionPaths[fn]}`;
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`Function error: ${res.statusText}`);
        return await res.json();
    } else {
        console.log("Importing function from:", `../functions/${functionPaths[fn]}`);
        const { default: handler } = await import(`../functions/${functionPaths[fn]}`);
        const request = new Request("http://localhost", {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined,
        });

        const response = await handler(request);
        return await response.json();

    }
}