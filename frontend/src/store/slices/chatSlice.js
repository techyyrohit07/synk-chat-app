import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { getUserChats } from "../../services/chatService.js";

export const fetchChats = createAsyncThunk('chats/fetchChats', async () => {
    const response = await getUserChats()
    return response
})

const chatSlice = createSlice({
    name : "chats",
    initialState : {
        chatList : [],
        activeChat : null
    },
    reducers : {
        setChatStatus : (state, action) => {
            state.activeChat = action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.chatList = action.payload
        })
    }
})

export const {setChatStatus} = chatSlice.actions

export default chatSlice.reducer