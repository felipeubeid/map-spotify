import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

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
        style={{ width: '100%', maxWidth: '900px', height: '350px', margin: '0 auto' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors & CartoDB'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {artists.map((artist) => {
          const [lat, lng] = artist.coordinates.map(Number);
          return (
            <Marker key={artist.position} position={[lat, lng]} icon={greenIcon}>
              <Popup>
                <div className="flex items-center gap-2">
                  <img
                    src={artist.image_url}
                    alt={artist.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <a
                      href={artist.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-green-400 underline"
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
      </MapContainer>
    </div>
  );
};

export default Map;
