import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {

  const { user } = useSelector((state) => state.user);

  const isAuthenticated = user && user !== "null";

    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#1E3A8A,_#0F172A,_#000)] text-white antialiased">
        <Routes>
          <Route path="/" element = { isAuthenticated ? <HomePage /> : <Navigate to= "/login" /> } /> 
          <Route path="/login" element = { !isAuthenticated ? <Login /> : <Navigate to='/' />} />
          <Route path="/register" element = { !isAuthenticated ? <Register /> : <Navigate to= '/' />} />
        </Routes>
      </div>
    )
}

export default App
