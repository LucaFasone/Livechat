import { UserWithoutPassword } from '../../../types';

declare global {
    namespace Express {
        interface Request {
            newAccessToken?: string;
            user?: UserWithoutPassword;

        }

    }
}
export { }