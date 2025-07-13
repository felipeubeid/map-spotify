from .auth_routes import auth_bp
from .top_artists_routes import top_artists_bp

# Function to register all routes in the Flask app
def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(top_artists_bp)