


export const registerSocketListeners = (socket, activeChatRef, onNewMessage) => {
    socket.on("receiveMessage", (message) => {
       
        console.log("Incoming messages from socket : ", message);
        
        

        if (activeChatRef.current && message.chatId === activeChatRef.current._id) {
        
          const formattedMessage = {
            _id: Date.now().toString(),
            content: message.text,        
            sender: message.senderId,     
            chatId: message.chatId,
            createdAt: message.createdAt
          }
          
          console.log("Adding message to chat:", formattedMessage);  
          onNewMessage(formattedMessage)
        }else{
            console.log("Messages not available for active chat");
            
        }
    })
}

export const cleanUpListeners = (socket) => {
    socket.off("receiveMessage")
    socket.disconnect()
}