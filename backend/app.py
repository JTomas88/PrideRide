from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para conectar con el front

@app.route('/', methods=['GET'])
def hello():
    return jsonify({'message': 'Welcome to the Flask API!'})

if __name__ == '__main__':
    app.run(debug=True)
