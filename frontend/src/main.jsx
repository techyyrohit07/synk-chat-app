import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store, { persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')).render(
    
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
