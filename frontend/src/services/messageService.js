import api from "./api";

export const getMessages = async (chatId) => {
    const response = await api.get(`/messages/${chatId}`)
    return response.data
}

export const sendMessage = async (chatId, content) => {
    const response = await api.post('/messages', {chatId, content})
    return response.data
}