import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Login } from './Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from './Dashboard.tsx'
//import { Citas } from './Citas.tsx'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,

  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/citas",
    element: <Dashboard />
  },

]);





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

  </StrictMode>
);
