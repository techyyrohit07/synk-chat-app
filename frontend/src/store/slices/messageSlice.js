import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages, sendMessage } from "../../services/messageService.js";


export const fetchMessages = createAsyncThunk('messages/fetchMessages', 
    async (chatId) => {
        const response = await getMessages(chatId)
        return response
    }
)

export const sendNewMessage = createAsyncThunk('messages/sendNewMessage', 
    async ({chatId, text}) => {
        const response = await sendMessage(chatId, text)
        return response
    }
)

const messageSlice = createSlice({
    name : "messages",
    initialState : {
        messages : []
    },
    reducers :  {

        addMessage : (state, action) => {
            state.messages.push(action.payload)
        },
        clearMessage : (state) => {
            state.messages = []
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages = action.payload
            })
            .addCase(sendNewMessage.fulfilled , (state, action) => {
                state.messages.push(action.payload)
            })
    }
})

export const { addMessage, clearMessage} = messageSlice.actions

export default messageSlice.reducer