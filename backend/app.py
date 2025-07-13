import os
from flask import Flask
from dotenv import load_dotenv
from routes import register_routes 

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)

register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
