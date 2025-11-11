import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './components/theme.css' 
import { RouterProvider } from 'react-router'
import { Router } from './routes/Router.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider> 
      <AuthProvider>
        <RouterProvider router={Router} />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>  
  </StrictMode>
);