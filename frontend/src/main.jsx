import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import SocketContext from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
 
   <Provider store = {store}>
     <BrowserRouter>
      <SocketContext>
        <App />
      </SocketContext>
    </BrowserRouter>
   </Provider>
  
)
