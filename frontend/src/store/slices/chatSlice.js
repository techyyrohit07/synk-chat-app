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
        activeChat : null,
        loading : false,
        error : null
    },
    reducers : {
        setChatStatus : (state, action) => {
            state.activeChat = action.payload
        },
        clearActiveChat : (state, action) => {
            state.activeChat = null
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchChats.pending, (state,action) => {
                state.loading = true
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
            state.chatList = action.payload
            state.loading = false
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const {setChatStatus, clearActiveChat} = chatSlice.actions

export default chatSlice.reducer