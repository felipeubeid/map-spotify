import React from 'react'

const Hero = () => {
  return (
    <section className="hero-background relative min-h-screen flex items-center justify-center overflow-hidden">
     {/* <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/70 "> */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
          Map Spotify
        </h1>
        <p className="text-xl md:text-xl text-muted-foreground">
          Discover where your favorite artists are from around the world.
        </p>
        <p className="text-xl md:text-xl text-muted-foreground mb-10">
          Connect with Spotify and explore music through geography.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
        <a
        href="http://127.0.0.1:5001"
        className="px-8 py-4 bg-green text-background font-semibold rounded-full hover:bg-green/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center">
          Log In with Spotify
        </a>
        </div>
      </div>
    </section>
  )
}

export default Hero