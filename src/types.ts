import { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import { z } from "zod";

export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    token: z.string().optional(),
});


export const UserRegistrationSchema = z.object({
    username: z.string().min(3, "Il nome utente deve avere almeno 3 caratteri"),
    email: z.string().email("Email non valida"),
    password: z.string().min(2, "La password deve avere almeno 6 caratteri"),
});


export interface JwtData extends DefaultJwtPayload {
    id: string; 
    email: string;
}

export type EmailTemplate = {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}

export type User = z.infer<typeof UserSchema>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type UserWithoutPassword = Omit<z.infer<typeof UserSchema>, 'password'>;
