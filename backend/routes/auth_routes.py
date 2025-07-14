from flask import Blueprint, session, redirect, url_for, request, jsonify
from spotify_auth import create_spotify
from flask_cors import CORS

auth_bp = Blueprint('auth', __name__)

CORS(auth_bp, supports_credentials=True, origins=["http://127.0.0.1:3000"])

@auth_bp.route('/')
def home():
    # Unpack all three objects that create_spotify returns
    sp, sp_oauth, cache_handler = create_spotify(session)

    # Check if the user is already authenticated
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        # If not authenticated, redirect to Spotify's authorization page
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    # If authenticated, redirect to the map page
    return redirect("http://127.0.0.1:3000/map")

@auth_bp.route('/callback')
def callback():
    sp, sp_oauth, cache_handler = create_spotify(session)
    
    # Get the authorization code from the request arguments
    code = request.args.get('code') # Code returned by Spotify after user authorization
    error = request.args.get('error') # Error returned by Spotify if the user denied authorization
    
    if error:
        # User denied the authorization or some error happened, redirect to home
        return redirect("http://127.0.0.1:3000") 
    
    if not code:
        # No authorization code was provided, redirect to home
        return redirect("http://127.0.0.1:3000")
    
    # Get the authorization code from the URL and use it to get an access token
    token_info = sp_oauth.get_access_token(code)
    if not token_info:
        return redirect("http://127.0.0.1:3000")
    # After logging in, send the user to see their top artists
    return redirect("http://127.0.0.1:3000/map")

@auth_bp.route('/logout')
def logout():
    # Clear the session to log out the user
    session.clear()
    return redirect("http://127.0.0.1:3000/")

@auth_bp.route('/auth/status')
def auth_status():
    sp, sp_oauth, cache_handler = create_spotify(session)
    token_info = cache_handler.get_cached_token()
    
    if token_info and sp_oauth.validate_token(token_info):
        return jsonify({'status': 'logged_in'}), 200
    else:
        return jsonify({'status': 'not_logged_in'}), 401