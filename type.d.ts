import { UserWithoutPassword } from './src/types';

declare global {
    namespace Express {
        interface Request {
            newAccessToken?: string;
            user?: UserWithoutPassword;

        }

    }
}
export { }