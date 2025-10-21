import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name : "user",
    initialState : {
        user : JSON.parse(localStorage.getItem("user")) || null
    },
    reducers : {
        setUser : (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        logOutUser : (state, action) => {
            state.user = null,
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }
    }
})

export const {setUser, logOutUser} = userSlice.actions

export default userSlice.reducer