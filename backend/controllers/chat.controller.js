import Chat from "../models/Chat.model.js";

export const getUserChats = async (req, res) => {
    try {
        const userId = req.user.id

        const chats = await Chat.find({participants : userId})
            .populate("participants", "username email")
            .populate("lastMessage")

        res.json(chats)
    } catch (error) {
        console.log("Error :",error);
        res.status(500).json({
            message : error.message
        })
        
    }
}

export const createChat = async (req,res) => {
    try {
        const {userId} = req.body
        const loggedInUserId = req.user.id

        let chat = await Chat.findOne({
            participants : { $all : [loggedInUserId, userId]}
        }).populate("participants", "username email")

        if(!chat){
            chat = await Chat.create({
                participants : [loggedInUserId, userId]
            })
        }

        res.status(201).json(chat)
    } catch (error) {
        console.log("Error while creating chat : ", error);
        res.status(500).json({
            message : error.message
        })
    }
}

