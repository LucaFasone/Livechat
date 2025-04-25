import { SocketHandler, SocketMessage } from "../types/socket";

export const registerMessage: SocketHandler = (socket,_) => {
    socket.on("message", (data:SocketMessage,ack) =>{
        if(!data.message || !data.room){
            ack({
                success: false,
                error: "Messaggio o room non specificati. Assicurati di inviare entrambi i campi."
              });
            return
        }
        socket.to(data.room).emit('message',{socketId: socket.id,message:data.message})
        ack({
            success: true,
            message: "Messaggio inviato con successo"
          });
    })
} 