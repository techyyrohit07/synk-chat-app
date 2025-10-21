import Chat from "../models/Chat.model.js";
import Message from "../models/Message.model.js";


export const getMessages = async(req,res) => {
    try {
        const {chatId} = req.params

        const message = await Message.find({chatId})
            .populate("sender", "username email")
            .sort({createdAt : 1})

        res.json(message)
    } catch (error) {
        console.log("Error while getting messages : ",error );
        res.status(500).json({
            message : error.message
        })
        
    }
}


export const sendMessage = async (req,res) => {
    try {
        const {chatId , content} = req.body
        const senderId = req.user.id

        const newMessage = await Message.create({
            chatId,
            sender : senderId,
            content
        })

        await Chat.findByIdAndUpdate(chatId, {lastMessage : newMessage._id})

        const populatedMessage = await newMessage.populate("sender", "username email")

        res.json(populatedMessage)
    } catch (error) {
        console.log("Error while sending message : ", error);
        res.status(500).json({
            message : error.message
        })   
    }
}