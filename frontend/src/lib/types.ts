//imagine this done in C with structs and crazy socket logic

export type Contact  = {
    id: string
    name: string
    lastMessage: string
    unread: number
}

export type User = {
    id: number;
    username: string;
    email: string;
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
export type contextType ={
    user: User | null 
}
