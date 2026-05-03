import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlobalProvider } from './context/GlobalContext'
import { AuthProvider } from './context/AuthContext'
import './i18n.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalProvider>
  </StrictMode>,
)
