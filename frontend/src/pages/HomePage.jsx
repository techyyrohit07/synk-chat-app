import { useEffect, useState } from "react";
import { ChatAppLayout } from "../components/chat/ChatAppLayout"
import {dummyUsers, dummyMessages} from '../data/mockData'
import LeftSideBar from "../components/layout/LeftSideBar";
import ChatArea from "../components/layout/ChatArea";
import RightSideBar from "../components/layout/RightSideBar";
import { getUserChats } from "../services/chatService";
import { getMessages, sendMessage } from "../services/messageService";
import { joinUser, sendSocketMessage, socket } from "../sockets/socket.js";
import { cleanUpListeners, registerSocketListeners } from "../sockets/socketEvents.js";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, setChatStatus } from "../store/slices/chatSlice.js";
import { addMessage, fetchMessages, sendNewMessage } from "../store/slices/messageSlice.js";



const HomePage = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const {chatList : chats , activeChat} = useSelector((state) => state.chats)
  const {messages : messages} = useSelector((state) => state.messages)

  const activeChatRef = useRef(activeChat)

  useEffect(() => {
    activeChatRef.current = activeChat
  }, [activeChat])

   useEffect(() => {
    dispatch(fetchChats()).then(() => {
      if(activeChat){
        console.log("Restore messages for persisting chat :", activeChat._id);
        dispatch(fetchMessages(activeChat._id))
        
      }
    })
  }, [dispatch])

  useEffect(() => {
    if(!user?._id) return
    console.log("User Id :", user._id);
    
    joinUser(user._id)
    registerSocketListeners(socket,activeChatRef, (msg) =>{
        dispatch(addMessage(msg))
      })  

    return () => {
      cleanUpListeners(socket)
    }
  }, [user?._id, dispatch])

  
  async function handleSelectChat(chat){
    dispatch(setChatStatus(chat))
    // console.log("Chats : ", chat);
    
    dispatch(fetchMessages(chat._id))
  }

  async function handleSendMessage(text){
    if(!activeChat) return
    try {
      const newMsg = await dispatch(sendNewMessage({chatId : activeChat._id, text})).unwrap()
    

      const receiver = activeChat.participants.find((p) => p._id !== user._id)

      sendSocketMessage({
        chatId : activeChat._id,
        senderId : user._id,
        receiverId : receiver._id,
        text
    })
    } catch (error) {
      console.log("Failed to send messages : ", error.message);
      
    }
  }
  
  return (
    <div>
      <ChatAppLayout 
        left={<LeftSideBar chats={chats}  onSelectChat = {handleSelectChat}  />}
        center={<ChatArea  activeChat={activeChat} onSendMessage={handleSendMessage} messages={messages}  />}
        right={<RightSideBar  />}
      />
    </div>

  )
}

export default HomePage