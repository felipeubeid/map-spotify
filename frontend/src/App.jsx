import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MapPage from "./pages/MapPage";
import NotAuthorized from './pages/NotAuthorized';
import { ToastContainer } from 'react-toastify'
import 'leaflet/dist/leaflet.css';

const App = () => {
  // Create the router with routes
  // Enables route-level data loading, error handling, and makes the app more scalable and maintainable
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Index />} />
        <Route path="map" element={<MapPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="not-authorized" element={<NotAuthorized />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={true} 
        newestOnTop 
        closeOnClick 
        pauseOnHover 
        theme="dark"/>
    </>
  )
}

export default App
