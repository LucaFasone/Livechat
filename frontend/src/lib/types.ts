import { QueryClient, UseMutationResult } from "@tanstack/react-query"
import { z } from "zod";

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const ContactSchema = z.object({
    id: z.string(),
    name: z.string(),
    lastMessage: z.string(),
    unread: z.number().nonnegative(),
});

const UserSchema = z.object({
    id: z.number().positive(),
    username: z.string().min(3, "Il nome utente deve essere lungo almeno 3 caratteri"),
    email: z.string().email("Email non valida"),
    password: z.string().min(8, "La password deve essere lunga almeno 8 caratteri").optional(),
    token: z.string().optional(),
});

const RoomSchema = z.object({
    id: z.string(),
    name: z.string(),
    participants: z.number().nonnegative(),
    lastMessage: z.string(),
    unread: z.number().nonnegative(),
});

const MessageSchema = z.object({
    id: z.string(),
    sender: z.string(),
    content: z.string(),
    timestamp: z.string(),
});

export type Email = z.infer<typeof UserSchema>['email'];

export interface AuthContext {
    user: z.infer<typeof UserSchema> | null;  
    register: UseMutationResult<any, Error, {
        username: z.infer<typeof UserSchema>['username'] | null;
        email: Email | null
        password: z.infer<typeof UserSchema>['password'] | null;
    }, unknown>;
    login: UseMutationResult<any, Error, {
        email: Email;
        password: string;
    }, unknown>;
    authenticatedRequest: UseMutationResult<any, Error, {
        url: string;
        method: RequestMethod;
        body?: {};
    }, unknown>;
    accessToken: string | null;
}

export type contextType = {
    auth: AuthContext
    queryClient: QueryClient,
}
export type User = z.infer<typeof UserSchema>
export type Contact = z.infer<typeof ContactSchema>
export type Room = z.infer<typeof RoomSchema>
export type Message = z.infer<typeof MessageSchema>