import React from 'react'
import { TbMoodSad } from "react-icons/tb";

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <TbMoodSad className="text-5xl text-foreground mb-4 block mx-auto" />
        <h1 className="text-4xl text-foreground font-semibold mb-4">Thanks for your interest!</h1>
        <p className="text-xl text-foreground font-semibold">Unfortunately, this app is currently in development mode and only available to a limited group of testers.</p>
        <p className="text-xl text-foreground font-semibold mb-8">Please check back later.</p>
        <a
          href="/"
          className="px-8 py-4 bg-green text-background font-semibold rounded-full hover:bg-green/90 
          transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          Return to Home
        </a>
      </div>
    </div>
  )
}

export default NotAuthorized
