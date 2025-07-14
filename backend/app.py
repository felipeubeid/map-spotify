import os
from flask import Flask
from dotenv import load_dotenv
from routes import register_routes 
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)

CORS(app, supports_credentials=True, origins=["http://127.0.0.1:3000"])

register_routes(app)

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5001)
