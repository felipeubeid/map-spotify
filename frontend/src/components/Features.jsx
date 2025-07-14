import React from 'react'
import { LuMapPin } from "react-icons/lu";
import { MdLibraryMusic } from "react-icons/md";

const Features = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Discover the World Through Your Music
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trace your favorite artists back to their roots and find out where it all began.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-muted/40 rounded-2xl p-6 h-full border border-border">
            <div className="rounded-xl mb-6 flex items-center justify-center text-4xl">
              <LuMapPin className="h-6 w-6 text-green mx-3" />
              <h3 className="font-playfair text-2xl font-semibold text-foreground"> 
                Geographic Discovery
              </h3>
            </div>
            <p className="text-muted-foreground text-large">
              See exactly where your top artists are from on an interactive world map and explore new regions through music.
            </p>
          </div>
          <div className="bg-muted/40 rounded-2xl p-6 h-full border border-border">
            <div className="rounded-xl mb-6 flex items-center justify-center text-4xl">
              <MdLibraryMusic className="h-6 w-6 text-green mx-3" />
              <h3 className="font-playfair text-2xl font-semibold text-foreground"> 
                Spotify Integration
              </h3>
            </div>
            <p className="text-muted-foreground text-large">
              Connect seamlessly with your Spotify account to analyze your listening history and top artists.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
