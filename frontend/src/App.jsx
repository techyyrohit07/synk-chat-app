import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#1E3A8A,_#0F172A,_#000)] text-white antialiased">
        <Routes>
          <Route path="/" element = {<HomePage />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/register" element = {<Register />} />
        </Routes>
      </div>
    )
}

export default App
