import {io} from "socket.io-client"

export const socket = io("http://localhost:5000", {
    withCredentials : true,
    autoConnect : false
})



export const joinUser = (userId) => {
    if(!socket.connected) socket.connect()
    socket.emit("join", userId)
}

export const sendSocketMessage = (messageData) => {
    socket.emit("sendMessage", messageData)
}

