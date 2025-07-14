import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MapPage from "./pages/MapPage";
import { ToastContainer } from 'react-toastify'
import 'leaflet/dist/leaflet.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={true} 
        newestOnTop 
        closeOnClick 
        pauseOnHover 
        theme="dark"
      />
    </>
  )
}

export default App
