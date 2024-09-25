import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/Landing.tsx'
import MainPage from './pages/MainPage.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: "34kZKvcMIgUH",
    element: <MainPage/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
