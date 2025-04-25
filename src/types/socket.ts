import { Socket, Server } from 'socket.io'

export type SocketHandler = (socket: Socket, io?: Server) => void;

export type SocketMessage = {
    message?:string | Object,
    room: string
}