import { useNavigate } from "react-router-dom"



const RightSideBar = () => {


  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const navigate = useNavigate()

  const onLogout = () =>{
    
    localStorage.removeItem("user")
    navigate('/login')
  }

  return (
    <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="bg-white/10 p-4 rounded-lg">
          <p className="font-medium">{user.username}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
        <button className="w-full bg-red-600 hover:bg-red-500 py-2 rounded-lg" type="button" onClick={onLogout} >
        Logout
      </button>
    </div>
  )
}

export default RightSideBar