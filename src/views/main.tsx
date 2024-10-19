import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Login } from './Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Dashboard.tsx'


const router= createBrowserRouter([
  {
    path: "/",
    element: <Login />,

  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    
  }

]);





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>

  </StrictMode>,
)
