import React from 'react'
import MapNavbar from "../components/MapNavbar";
import MapSection from "../components/MapSection";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MapNavbar />
      <MapSection />
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm font-semibold">
          All copyrighted contents are owned by their respective owners. Data is provided by Spotify AB. We are in no way related with Spotify AB.
          </p>
          <p className="text-muted-foreground text-sm font-medium">
            © 2025 Felipe Ubeid. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default MapPage
