import {Server} from "socket.io"
import { registerSocketHandlers } from "./socketHandlers.js";

let io;
let onlineUsers = new Map()

export const initializeSocketConnection = (server) => {
    io = new Server(server,{
        cors : {
            origin : "http://localhost:5173",
            credentials : true
        }
    })
    
    io.on("connection", (socket) => {
        console.log("Socket id : ", socket.id);
        registerSocketHandlers(io, socket, onlineUsers)
        
    })

    return io
}

export const getIo = () => io