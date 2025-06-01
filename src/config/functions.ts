export enum FunctionName {
    GetUsers = "get-users",
    SendNotification = "send-notification",
}

export const functionPaths: Record<FunctionName, string> = {
    [FunctionName.GetUsers]: "get-users",
    [FunctionName.SendNotification]: "send-notification",
};
export function isRunningOnRailway() {
    return !!process.env.RAILWAY_FUNCTION_URL || !!process.env.RAILWAY_ENVIRONMENT_NAME;  
}

