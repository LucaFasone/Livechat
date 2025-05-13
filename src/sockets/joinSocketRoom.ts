import { SocketHandler, WsJoinRoomMessage, WsMessageAck } from "../types/socket";

export const joinSocketRooms: SocketHandler = (socket) => {
    socket.on('joinRoom', (data:WsJoinRoomMessage,ack:WsMessageAck) =>{
        //TODO: check if the user exits
        if(data.roomId && data.roomId.length > 0){
            socket.join(data.roomId)
            ack("OK")
            return
        }
        ack("NOT OK")
    })

}
