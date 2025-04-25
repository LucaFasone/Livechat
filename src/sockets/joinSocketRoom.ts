import { SocketHandler, SocketMessage } from "../types/socket";

export const joinSocketRooms: SocketHandler = (socket) => {
    socket.on('joinRoom', (data:SocketMessage,ack) =>{
        //TODO: check if the user exits
        if(data.room.length > 0){
            socket.join(data.room)
            ack({
                success:true
            })
        }
    })

}