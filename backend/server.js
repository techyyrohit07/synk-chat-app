import * as http from 'http'
import app from './app.js'
import dotenv from 'dotenv'
import { initializeSocketConnection } from './sockets/index.js'

dotenv.config()
const PORT = process.env.PORT 
const server = http.createServer(app)

initializeSocketConnection(server)

server.listen(PORT,()=>{
    console.log("Server started on PORT : ", PORT);
    
})