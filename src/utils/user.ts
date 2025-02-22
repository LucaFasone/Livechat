import { UserRegistrationSchema } from "../types";

export const validateEmail = (email: string): boolean =>  UserRegistrationSchema.pick({ email: true }).parse({email}).email === email;