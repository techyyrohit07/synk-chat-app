import { useEffect, useState } from "react";
import { ChatAppLayout } from "../components/chat/ChatAppLayout"
import {dummyUsers, dummyMessages} from '../data/mockData'
import LeftSideBar from "../components/layout/LeftSideBar";
import ChatArea from "../components/layout/ChatArea";
import RightSideBar from "../components/layout/RightSideBar";
import { getUserChats } from "../services/chatService";
import { getMessages, sendMessage } from "../services/messageService";
import { loginUser } from "../services/authService";
import { joinUser, sendSocketMessage, socket } from "../sockets/socket.js";
import { cleanUpListeners, registerSocketListeners } from "../sockets/socketEvents.js";
import { useRef } from "react";



const HomePage = () => {

  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const activeChatRef = useRef(activeChat)

  useEffect(() => {
    (async () => {
      const data = await getUserChats()
      setChats(data)
    })()
  }, [])

  useEffect(() => {
    activeChatRef.current = activeChat
  }, [activeChat])

  useEffect(() => {
    if(user._id){
      joinUser(user._id)
      registerSocketListeners(socket,activeChatRef, setMessages)
    }

    return () => cleanUpListeners(socket)
  }, [user._id])

  
  async function handleSelectChat(chat){
    setActiveChat(chat)
    console.log(chat);
    
    const data = await getMessages(chat._id)
    setMessages(data)
    console.log("Message :" ,data);
    
    
  }

  async function handleSendMessage(text){
    if(!activeChat) return
    const newMsg = await sendMessage(activeChat._id, text)
    setMessages((prev) => [...prev, newMsg])

    const receiver = await activeChat.participants.find((p) => p._id !== user._id)

    sendSocketMessage({
      chatId : activeChat._id,
      senderId : user._id,
      receiverId : receiver._id,
      text
    })
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