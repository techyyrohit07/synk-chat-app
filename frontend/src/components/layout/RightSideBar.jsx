import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOutUser } from "../../store/slices/userSlice.js"
import { socket } from "../../sockets/socket.js"
import { clearActiveChat } from "../../store/slices/chatSlice.js"
import { clearMessage } from "../../store/slices/messageSlice.js"



const RightSideBar = () => {

  const user = useSelector((state) => state.user)
  const dispatch =  useDispatch()
  const navigate = useNavigate()

  const onLogout = () =>{
    
    socket.disconnect()
    
    dispatch(logOutUser())
    dispatch(clearActiveChat())
    dispatch(clearMessage())

    

    navigate('/login')
  }

  return (
    <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="bg-white/10 p-4 rounded-lg">
          <p className="font-medium">{user?.username}</p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
        <button className="w-full bg-red-600 hover:bg-red-500 py-2 rounded-lg" type="button" onClick={onLogout} >
        Logout
      </button>
    </div>
  )
}

export default RightSideBar