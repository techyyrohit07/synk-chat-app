import {useForm}  from "react-hook-form"
import {useNavigate} from "react-router-dom"
import { registerUser } from "../services/authService"

const RegistrationForm = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState : {errors, isSubmitting,}
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await registerUser(data)
            alert("Registration Successfull")
            reset()
            navigate('/login')
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Registration Failed")     
        }

        
    }

  return (
    <div className="min-h-screen flex items-center justify-center ">
        <div className="backdrop-blur-lg bg-white/5 border border-white-40 rounded-2xl shadow-lg p-10 w-full max-w-md" >
            <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <input 
                        type="text"
                        placeholder="Username"
                        {...register('username', {required : "Username is required"})}
                        className="w-full p-3 rounded-lg bg-white/10 placeholder-white text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.username && (
                        <p className="h-5 text-red-400 text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        {...register('email', {
                            required : "Please provide email",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })}
                        className="w-full p-3 rounded-lg bg-white/10 placeholder-white text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />

                    {errors.email && (
                        <p className="h-5 text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )} 
                </div>

                <div>
                    <input 
                        type="text"
                        placeholder="Password"
                        {...register('password' , {
                            required : 'Enter the password',
                            minLength : { value : 6 , message : 'Minimum length is 6 characters'}

                        })}
                        className="w-full p-3 rounded-lg bg-white/10 placeholder-white text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.password && (
                        <p className="h-5 text-red-400 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <input 
                        type="text"
                        placeholder="Confirm Password"
                        {...register('confirmPassword', {
                            required : 'Enter the password same as above',
                            validate : (value) => {
                                value === watch || "Password do not match"
                            }
                        })} 
                        className="w-full p-3 rounded-lg bg-white/10 placeholder-white text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.confirmPassword && (
                        <p className="h-5 text-red-400 text-sm mt-1"> {errors.confirmPassword.message} </p>
                    )}
                </div>
                
                <button type="submit" className="w-full rounded-lg py-4 text-xl bg-white/5 backdrop-blur-md border border-white/40 font-bold hover:bg-white/30 transition">
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

            </form>

            <p className="text-white mt-4 text-center">
                Already have an account? {" "}
                <a href="/login" className="text-blue-400 hover:underline">Login</a>
            </p>

        </div>
    </div>
  )
}

export default RegistrationForm