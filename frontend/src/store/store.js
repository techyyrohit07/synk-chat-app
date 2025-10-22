import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'
import chatReducer from './slices/chatSlice.js'
import messageReducer from './slices/messageSlice.js'
import {persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key : 'root',
    storage,
    whitelist : ["user", "chats"]
}

const rootReducer = combineReducers({
    user :  userReducer,
    chats : chatReducer,
    messages : messageReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleWare) => 
        getDefaultMiddleWare({
            serializableCheck : false
        })
})

export const persistor = persistStore(store)
export default store