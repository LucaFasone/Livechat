import { Socket, Server } from 'socket.io'
import { z } from 'zod'

export type SocketHandler = (socket: Socket, io?: Server) => void;

export const WsMessageAckSchema = z.function()
    .args(z.enum(["OK", "NOT OK"]))
    .returns(z.void());


export const WsMessageSchema = z.object({
    data: z.any(),
    roomId: z.string().optional(),
    userId: z.union([z.string(), z.number()]).optional(),
});
const WsJoinRoomMessageSchema = z.object({
    roomId: z.string().optional(),
})


export type WsJoinRoomMessage = z.infer<typeof WsJoinRoomMessageSchema>
export type WsMessage = z.infer<typeof WsMessageSchema> ;
export type WsMessageAck = z.infer<typeof WsMessageAckSchema>;