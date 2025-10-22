import {useForm} from 'react-hook-form'
import { loginUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../store/slices/userSlice'
import { useDispatch } from 'react-redux'

const LoginForm = () => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset, 
        formState : {errors}
    } = useForm()

    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const response = await loginUser(data)
        alert(response.message)
        dispatch(setUser(response.user))
        // localStorage.setItem("userId", JSON.stringify(response.user._id))
        // localStorage.setItem("username", JSON.stringify(response.user.username))
        // localStorage.setItem("email", JSON.stringify(response.user.email))
        

        
        reset()
        
        navigate('/')
        
    }

  return (
    
    <div className="min-h-screen flex items-center justify-center ">
        <div className="backdrop-blur-lg bg-white/5 border border-white-40 rounded-2xl shadow-lg p-10 w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">

                <div>
                    <input 
                        type="text"
                        placeholder='Email'
                        {...register('email', {
                            required : "Enter your Email",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        } )}  
                        className="w-full p-3 rounded-lg bg-white/10 placeholder-white text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.email && (
                        <p className="h-5 text-red-400 text-sm mt-1">{errors.email.message}</p>
                    ) }
                </div>

                <div>
                    <input 
                        type="text"
                        placeholder='Password'
                        {...register('password', {
                            required : "Enter your Password",

                        })}
                        className="w-full p-3 rounded-lg bg-white/10 placeholder-white text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && (
                        <p className="h-5 text-red-400 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>
                
                <button type='submit' className="w-full rounded-lg py-4 text-xl bg-white/5 backdrop-blur-md border border-white/40 font-bold hover:bg-white/30 transition">
                    Login
                </button>
            </form>
            
            <p className="text-white mt-4 text-center">Do not have an account? {" "}
                <a href="/register" className="text-blue-400 hover:underline"> Register </a>
            </p>

        </div>
    </div>
  )
}

export default LoginForm