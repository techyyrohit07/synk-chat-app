import express from 'express'
import cors from 'cors'
import connect  from './db/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.routes.js'
import chatRoutes from './routes/chat.routes.js'
import messageRoutes from './routes/message.routes.js'


dotenv.config()

const app = express()
connect()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials: true
}))

app.use('/api/auth', userRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)



export default app