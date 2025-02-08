from dotenv import load_dotenv
load_dotenv()  # Debe ir al principio para cargar las variables de entorno

import os
import secrets
import logging
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from extensions import db
from admin import setup_admin

# Importar la configuración
from config import Config
from services.user.user_service import user_blueprint
from services.travel.travel_service import travel_blueprint
from services.vehicles.vehicle_service import vehicle_blueprint
from services.apigoogle.apigoogle_service import apigoogle_blueprint



def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    JWTManager(app)
    
    CORS(app, resources={r"/*": {"origins": ["http://localhost:4200"], "supports_credentials": True}})

    db.init_app(app)
    
    migrate = Migrate(app, db)
    
    setup_admin(app)

    handler = logging.StreamHandler()
    handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)

   
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.DEBUG)
    
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #       IMPORTACIONES DE LOS DIFERENTES SERVICIOS DE LA API  
    #
    # --> user_blueprint: Servicio relacionado con los usuarios
    # --> travel_blueprint: Servicio relacionado con los viajes
    # --> vehicle_blueprint: Servicio relacionado con los vehículos
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    app.register_blueprint(user_blueprint, url_prefix="/user")
    app.register_blueprint(travel_blueprint, url_prefix="/travel")
    app.register_blueprint(vehicle_blueprint, url_prefix="/vehicle")
    app.register_blueprint(apigoogle_blueprint, url_prefix="/apigoogle")

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
