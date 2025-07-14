from flask import Blueprint, session, redirect, url_for, request
from spotify_auth import create_spotify

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/')
def home():
    # Unpack all three objects that create_spotify returns
    sp, sp_oauth, cache_handler = create_spotify(session)

    # Check if the user is already authenticated
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        # If not authenticated, redirect to Spotify's authorization page
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    # If authenticated, redirect to the top artists page
    return redirect(url_for('top_artists.get_top_artists'))

@auth_bp.route('/callback')
def callback():
    sp, sp_oauth, cache_handler = create_spotify(session)
    
    # Get the authorization code from the request arguments
    code = request.args.get('code') # Code returned by Spotify after user authorization
    error = request.args.get('error') # Error returned by Spotify if the user denied authorization
    
    if error:
        # User denied the authorization or some error happened, redirect to home
        return redirect("http://localhost:3000") 
    
    if not code:
        # No authorization code was provided, redirect to home
        return redirect("http://localhost:3000")
    
    # Get the authorization code from the URL and use it to get an access token
    token_info = sp_oauth.get_access_token(code)
    if not token_info:
        return redirect("http://localhost:3000")
    # After logging in, send the user to see their top artists
    return redirect(url_for('top_artists.get_top_artists'))

@auth_bp.route('/logout')
def logout():
    # Clear the session to log out the user
    session.clear()
    return redirect(url_for('auth.home'))
