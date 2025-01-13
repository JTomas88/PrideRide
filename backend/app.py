from flask import Flask, jsonify, request
from flask_cors import CORS
from services.user.user_service import user_blueprint
from services.travel.travel_service import travel_blueprint

app = Flask(__name__)
CORS(app)  # Habilitar CORS para conectar con el front


app.register_blueprint(user_blueprint, url_prefix="/user")
app.register_blueprint(travel_blueprint, url_prefix="/travel")

@app.route('/', methods=['GET'])
def hello():
    return jsonify({'message': 'Welcome to the Flask API!'})

if __name__ == '__main__':
    app.run(debug=True)
