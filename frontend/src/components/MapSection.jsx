import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import ArtistsTable from './ArtistsTable';
import Map from './Map';

const MapSection = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        // Check if user is authenticated
        await axios.get('http://127.0.0.1:5001/auth/status', { withCredentials: true });
        // If here, user is logged in, fetch artists
        const artistsRes = await axios.get('http://127.0.0.1:5001/get_top_artists', { withCredentials: true });
        setArtists(artistsRes.data.top_artists || []);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Not authenticated, redirect to login page
          navigate('/');
        } else {
          toast.error('Failed to load artists or authentication status.');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden hero-background pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gradient">Your Spotify on a Map</h2>
          <p className="text-muted-foreground text-md">
            Explore the global roots of your favorite artists
          </p>
        </div>
        <div className="space-y-6 mb-12">
          <Map artists={artists} />
        </div>
        <div className="space-y-6 mb-12">
          <ArtistsTable artists={artists} />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
