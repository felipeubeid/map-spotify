from flask import Blueprint, session, redirect, jsonify
from spotify_auth import create_spotify
from get_location import get_artist_location
from flask_cors import CORS
from spotipy.exceptions import SpotifyException

top_artists_bp = Blueprint('top_artists', __name__)

CORS(top_artists_bp, supports_credentials=True, origins=["http://127.0.0.1:3000"])

@top_artists_bp.route('/get_top_artists')
def get_top_artists():
    sp, sp_oauth, cache_handler = create_spotify(session)
    
    token_info = cache_handler.get_cached_token()
    if not sp_oauth.validate_token(token_info):
        return jsonify({'error': 'Unauthorized'}), 401
    
    # Check if the user is authenticated
    try:
        sp.current_user()
    except SpotifyException as e:
        session.clear() # Clear the session if the user is not authorized
        if e.http_status == 403: 
            return jsonify({'error': 'Not authorized'}), 403
        else:
            raise
    
    # If authenticated, fetch the user's top artists
    results = sp.current_user_top_artists(limit=20)
    
    # Format the results to return a list of top artists with their details
    artists_data = []
    for i, artist in enumerate(results['items'], start=1):
        # Get the artist's begin area and coordinates
        begin_area_info = get_artist_location(artist['name'])
        
        artists_data.append({
            "position": i,
            "name": artist['name'],
            "profile_url": artist['external_urls']['spotify'],
            "image_url": artist['images'][0]['url'] if artist['images'] else None,
            "begin_area": begin_area_info.get("birthplace") if begin_area_info else None,
            "coordinates": begin_area_info.get("coordinates") if begin_area_info else None,
            "country": begin_area_info.get("country") if begin_area_info else None
        })
    
    return jsonify({"top_artists": artists_data})