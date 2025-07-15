# Map Spotify

A full-stack application that fetches your top Spotify artists and fetches their birthplaces on an interective world map.

## Features

- Login with Spotify account (OAuth)
- Fetch top artists using the Spotify Web API
- Get artist birthplace and country data via MusicBrainz and Nominatim
- Display artists on an interactive map using Leaflet.js
- View artists in a detailed table below the map

## Built with:

- React + Vite
- Tailwind CSS, Leaflet
- Flask (Python)
- Spotify Web API, MusicBrainz, Nominatim
- Redis

## Installation Instructions

1. Clone the repository:
```https://github.com/felipeubeid/map-spotify.git```
2. Set up backend (Flask):
```
cd backend
python3 -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install redis
make run
```
Runs on http://127.0.0.1:5001 by default

Create a ```.env``` file in the backend folder with:
```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=your_spotify_redirect_uri
WIKIDATA_EMAIL=your_wikidata_email
```

3. Set up frontend (React)
```
cd frontend
npm install
npm run dev
```
Runs on http://127.0.0.1:3000 by default

## License

MIT License
