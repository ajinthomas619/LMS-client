import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {Store,persistor} from './redux/store/store.js';

const theme = createTheme({
  palette: {
    primary:{
      main:"#013e87"
    },
    secondary:{
      main:"#2e74c9"
    },
    typography:{
      h1:{
        fontSize:"3rem",
        fontWeight:600
      },
      h2:{
        fontSize:"2rem",
        fontWeight:600
      },
      h3:{
        fontSize:"1.5rem",
        fontWeight:600
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store ={Store}>
    <ThemeProvider theme={theme}>
     
    <App />
  
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
