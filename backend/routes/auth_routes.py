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
    
    # Get the authorization code from the URL and use it to get an access token
    sp_oauth.get_access_token(request.args['code'])
    # After logging in, send the user to see their top artists
    return redirect(url_for('top_artists.get_top_artists'))

@auth_bp.route('/logout')
def logout():
    # Clear the session to log out the user
    session.clear()
    return redirect(url_for('auth.home'))
