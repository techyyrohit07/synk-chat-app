import { useSelector } from "react-redux";


const LeftSideBar = ({chats, onSelectChat}) => {

  const user = useSelector((state) => state.user)

  return (
    <div className="p-4 overflow-y-auto h-full space-y-2">
        <h1 className="text-xl font-semibold mb-4">Chats</h1>
        <div>
           {chats.map((chat) => {
              const otherUser = chat.participants.find(
                (p) => p._id !== user._id
              );

              return(
                <div
                  key={chat._id}
                  onClick={() => onSelectChat(chat)}
                  className="p-3 bg-white/10 hover:bg-blue-600 cursor-pointer rounded-lg"
                >
                  <p> {otherUser?.username} </p>
                  <p className="text-xs text-gray-400"> {chat?.lastMessage.text || "No new messages"} </p>
                </div>
              )
           })}
        </div>
    </div>
  )
}

export default LeftSideBar