//imagine this done in C with structs and crazy socket logic

import { useAuth } from "@/hooks/useAuth"
import { QueryClient, UseMutationResult } from "@tanstack/react-query"

export type Contact = {
    id: string
    name: string
    lastMessage: string
    unread: number
}

export type User = {
    id: number;
    username: string;
    email: string;
    password?: string;
    token?: string;
}

export type Room = {
    id: string
    name: string
    participants: number
    lastMessage: string
    unread: number
}

export type Message = {
    id: string
    sender: string
    content: string
    timestamp: string
}
export interface AuthContext {
    user: User | null;
    register: UseMutationResult<any, Error, {
        username: string;
        email: string;
        password: string;
    }, unknown>;
    login: UseMutationResult<any, Error, {
        email: string;
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

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'