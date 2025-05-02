import { UserWithoutPassword } from "./src/types";

declare global {
    namespace Express {
        interface User extends UserWithoutPassword {} 

        interface Request {
            newAccessToken?: string;

        }

    }
}
export { }