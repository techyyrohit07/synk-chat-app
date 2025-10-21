import { useEffect, useRef, useState } from "react";

const ChatArea = ({activeChat , messages, onSendMessage}) => {

  if(!activeChat){
    return <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
      Select a user to start chatting
    </div>
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const currentUserId = user._id

  function handleSubmit(e){
    e.preventDefault()
    const text = e.target.message.value.trim()
    console.log(text);
    if(!text) return
    onSendMessage(text)
    e.target.reset()
  }

  const messagesEndRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const [isNearBottom, setNearBottom] = useState(true)

  useEffect(() => {
    if(isNearBottom && messagesEndRef.current){
      messagesEndRef.current.scrollIntoView({behavior : "smooth"})
    }
    
  }, [messages , isNearBottom])

  function handleScroll(){
    const scroll = scrollContainerRef.current 
    if(!scroll) return

    const isAtBottom = scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 80
    setNearBottom(isAtBottom)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10 bg-white/10 backdrop-blur-lg">
        <h2 className="text-lg font-semibold">
          {activeChat.participants.find(
          (p) => p._id !== currentUserId)?.username || "Chat"
          }
        </h2>
      </div>
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
          {messages.map((message) => {
            // Handle both object and string sender formats
            const senderId = typeof message.sender === 'object' 
              ? message.sender._id 
              : message.sender
            
            const isMyMessage = senderId === currentUserId

            return (
              <div 
                key={message._id} 
                className={`p-2 rounded-lg max-w-xs sm:max-w-sm md:max-w-md break-words whitespace-pre-wrap overflow-hidden shadow-md ${
                  isMyMessage
                    ? "bg-blue-600/80 ml-auto text-white"
                    : "bg-gray-700/80 text-gray-100"
                }`}>
                {message.content}
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
        
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t border-white/20 bg-white/10 backdrop-blur-md" >
            <input 
              type="text" 
              name="message" 
              placeholder='type your message' 
              className="flex-1 p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type='submit' className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all"> Send </button>
          </form>
        
    </div>
    
  )
}

export default ChatArea