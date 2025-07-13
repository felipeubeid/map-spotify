from flask import Blueprint, session, redirect, jsonify
from spotify_auth import create_spotify
from get_location import get_artist_location

top_artists_bp = Blueprint('top_artists', __name__)

@top_artists_bp.route('/get_top_artists')
def get_top_artists():
    sp, sp_oauth, cache_handler = create_spotify(session)

    # Check if the user is authenticated
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        # If not authenticated, redirect to Spotify's authorization page
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    
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
            "coordinates": begin_area_info.get("coordinates") if begin_area_info else None
        })
    
    return jsonify({"top_artists": artists_data})