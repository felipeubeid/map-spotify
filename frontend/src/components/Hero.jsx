import React from 'react'
import { AiOutlineSpotify } from "react-icons/ai";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-muted/50">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
          Spotify Map
        </h1>
        <p className="text-xl md:text-xl text-muted-foreground">
          Discover where your favorite artists are from around the world.
        </p>
        <p className="text-xl md:text-xl text-muted-foreground mb-10">
          Connect your Spotify and explore music through geography.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
          <button className="px-8 py-4 bg-green text-background font-semibold rounded-full hover:bg-green/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Log In with Spotify
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero