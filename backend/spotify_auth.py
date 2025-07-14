import os
from dotenv import load_dotenv
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

load_dotenv()

CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
REDIRECT_URI = os.getenv('SPOTIFY_REDIRECT_URI', 'http://127.0.0.1:5001/callback')
SCOPE = 'user-top-read' # Scope for reading user's top tracks and artists

# Create a Spotify client with OAuth authentication
def create_spotify(session):
    # Use FlaskSessionCacheHandler to store Spotify OAuth tokens securely in the user's session
    cache_handler = FlaskSessionCacheHandler(session)
    sp_oauth = SpotifyOAuth(
        client_id=CLIENT_ID, 
        client_secret=CLIENT_SECRET,
        redirect_uri=REDIRECT_URI,
        scope=SCOPE,
        cache_handler=cache_handler,
        show_dialog=True # Set to True to show the login dialog every time
    )
    # Create a Spotify client instance with the OAuth manager
    sp = Spotify(auth_manager=sp_oauth)
    return sp, sp_oauth, cache_handler