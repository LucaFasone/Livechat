import { emailExits } from "../db/query";
import { UserRegistrationSchema } from "../types";

export const validateEmail = async (email: string) => UserRegistrationSchema.pick({ email: true }).parse({ email }).email === await emailExits(email);