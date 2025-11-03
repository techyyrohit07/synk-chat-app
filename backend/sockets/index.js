import {Server} from "socket.io"
import { registerSocketHandlers } from "./socketHandlers.js";

let io;
let onlineUsers = new Map()

export const initializeSocketConnection = (server) => {
    io = new Server(server,{
        cors : {
            origin : process.env.CLIENT_URL,
            credentials : true,
            methods: ["GET", "POST"]
        }
    })
    
    io.on("connection", (socket) => {
        console.log("Socket id : ", socket.id);
        registerSocketHandlers(io, socket, onlineUsers)
        
    })

    return io
}

export const getIo = () => io