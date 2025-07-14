import React from 'react'
import { useState, useEffect } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-background border-b border-border"
      }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-foreground cursor-pointer">
            <FaMapMarkedAlt className="h-6 w-6 text-green" />
            <span>Map Spotify</span>
          </div>
          <a 
          href="http://127.0.0.1:5001"
          className="text-white font-semibold cursor-pointer hover:text-muted-foreground duration-300 transition-all transform hover:scale-105">
            Log In
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
