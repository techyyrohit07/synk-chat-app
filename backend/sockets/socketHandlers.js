


export const registerSocketHandlers = (io, socket, onlineUsers) => {
    
    socket.on("join", (userId)=> {
        onlineUsers.set(userId, socket.id)
        console.log(`User ${userId} joined`);
        console.log("Online users : ", onlineUsers);
        
        
    })

    socket.on("sendMessage", (data) =>{
        const { chatId, senderId, receiverId, text } = data;

        console.log("SendMessage event received:", data);
        console.log("Current online users : ", onlineUsers);
        

        const receiverSocketId = onlineUsers.get(receiverId)

        if(receiverSocketId){
            console.log("Sending message to receiver: ", receiverSocketId);
            
            io.to(receiverSocketId).emit("receiveMessage", {
                _id : Date.now().toString(),
                chatId,
                senderId,
                text,
                createdAt: new Date(),
                
            })
        }else{
            console.log("Receiver not online or joined");
            
        }
    })

    socket.on("disconnect", () => {
    
        console.log("User disconnected : ", socket.id);
        for (const [userId, id] of onlineUsers.entries()) {
            if(id === socket.id){
                onlineUsers.delete(userId)
                break;
                
            }
        }
    })
}