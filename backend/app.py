from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from services.user.user_service import user_blueprint
from services.travel.travel_service import travel_blueprint
from services.vehicles.vehicle_service import vehicle_blueprint
from flask_jwt_extended import JWTManager
import secrets
from extensions import db
from admin import setup_admin

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": [ "http://localhost:4200"], "supports_credentials": True}})


    # Configuración de la base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///prideride.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    jwt = JWTManager(app)
    app.config['JWT_SECRET_KEY'] = secrets.token_hex(32)
    # Inicializa la extensión db con la app
    db.init_app(app)

    # Configuración de migraciones
    migrate = Migrate(app, db)

    # Configuración del admin
    setup_admin(app)

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

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
