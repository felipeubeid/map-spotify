import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Remove default icon URLs:
delete L.Icon.Default.prototype._getIconUrl;

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: '',
});

const Map = ({ artists }) => {
  const defaultPosition = [20, 0]; // global-ish center

  return (
    <div className="relative z-0">
      <MapContainer
        center={defaultPosition}
        zoom={2}
        style={{ 
          width: '100%', 
          height: '60vw', 
          maxHeight: '400px', 
          margin: '0 auto',
          borderRadius: '12px',
          border: '1px solid hsl(210 6% 16%)' 
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors & CartoDB'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup
        spiderfyOnMaxZoom={true}
        showCoverageOnHover={false}
        maxClusterRadius={1}
        >
        {artists.map((artist) => {
          const [lat, lng] = artist.coordinates.map(Number);
          return (
            <Marker key={artist.position} position={[lat, lng]} icon={greenIcon}>
              <Popup>
                <div className="flex items-center gap-3">
                  <img
                    src={artist.image_url}
                    alt={artist.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <span className="font-bold text-foreground text-xs">
                      {artist.position}.{' '}</span>
                    <a
                      href={artist.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="custom-link font-bold text-md duration-300 transition-all transform hover:scale-105"
                    >
                      {artist.name}
                    </a>
                    <div>
                      {artist.begin_area}, {artist.country}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
