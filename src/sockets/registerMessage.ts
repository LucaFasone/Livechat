import { SocketHandler, WsMessage, WsMessageAck } from "../types/socket";

export const registerMessage: SocketHandler = (socket,_) => {
    socket.on("message", (data:WsMessage,ack:WsMessageAck) =>{
        if(!data.data || !data.roomId ){
            ack("OK");
            return
        }
        socket.to(data.roomId).emit('message',{socketId: socket.id,message:data.data})
        ack("OK");
    })
} 