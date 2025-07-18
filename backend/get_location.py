import requests
from dotenv import load_dotenv
import os
import redis
import json

load_dotenv()
email = os.getenv("WIKIDATA_EMAIL")

# Connect to Redis
redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

def get_location_musicbrainz(artist_name):
    search_url = "https://musicbrainz.org/ws/2/artist/"
    # MusicBrainz API endpoint to search for artists
    params = {
        "query": artist_name,
        "fmt": "json",
        "limit": 1
    }
    # Setting the User-Agent header to identify the application
    headers = {
        "User-Agent": f"MapSpotifyApp/0.1 ({email})"
    }
    
    # Making the request to MusicBrainz API
    response = requests.get(search_url, params=params, headers=headers)
    # Check if the request was successful
    if response.status_code != 200:
        return None
    
    # Parse the JSON response
    data = response.json()
    if not data['artists']:
        return None
    
    # Get the first artist from the search results
    artist = data['artists'][0]

    # Check if the artist has a begin-area or area
    location = None
    # If the artist has a begin-area, use that. Otherwise, use the area
    if 'begin-area' in artist and artist['begin-area']:
        location = artist['begin-area']['name']
    elif 'area' in artist and artist['area']:
        location = artist['area']['name']
    
    return location

def get_geo_info(place_name):
    geo_url = "https://nominatim.openstreetmap.org/search"
    # Nominatim API endpoint to get coordinates for a place name
    params = {
        "q": place_name,
        "format": "json",
        "limit": 1,
        # addressdetails is set to 1 to get detailed address information
        "addressdetails": 1
    }
    # Setting the User-Agent header to identify the application
    headers = {
        "User-Agent": f"MapSpotifyApp/0.1 ({email})",
        "Accept-Language": "en"
    }
    
    # Making the request to Nominatim API
    response = requests.get(geo_url, params=params, headers=headers)
    # Check if the request was successful
    if response.status_code != 200:
        return None
    
    # Parse the JSON response
    results = response.json()
    if not results:
        return None
    
    # Get the first result from the search
    lat = results[0]['lat']
    lon = results[0]['lon']
    address = results[0].get('address', {}) # Get address details if available
    country = address.get('country') # Get the country from the address details
    
    return {
        "coordinates": (lat, lon),
        "country": country
    }

def get_artist_location(artist_name):
    
    # Check if the artist's location is cached in Redis
    cached = redis_client.get(artist_name)
    if cached:
        return json.loads(cached)
    
    # If not cached, fetch artist location data
    # Get the location of an artist
    location = get_location_musicbrainz(artist_name)
    if not location:
        result = {
            "birthplace": None,
            "coordinates": None,
            "country": None
        }
    else:
        # Get the coordinates and country for the location
        geo_info = get_geo_info(location)
        if not geo_info:
            result = {
                "birthplace": location,
                "coordinates": None,
                "country": None
            }
        else:
            result = {
                "birthplace": location,
                "coordinates": geo_info["coordinates"],
                "country": geo_info["country"]
            }
            
    # Cache the result in Redis for future requests
    # Use the artist's name as the key in Redis
    redis_client.set(artist_name, json.dumps(result))
    return result