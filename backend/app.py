from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from services.user.user_service import user_blueprint
from services.travel.travel_service import travel_blueprint
from extensions import db
from admin import setup_admin

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configuración de la base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///prideride.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

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
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    app.register_blueprint(user_blueprint, url_prefix="/user")
    app.register_blueprint(travel_blueprint, url_prefix="/travel")

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
