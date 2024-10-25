//imagine this done in C with structs and crazy socket logic
export type Contact = {
    id: string
    name: string
    lastMessage: string
    unread: number
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