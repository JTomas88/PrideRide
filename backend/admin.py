from extensions import db
from models import Usuario, Vehiculo, Monedero, Puntuacion, Viaje

from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    admin = Admin(app, name='PRIDERIDE BD', template_mode='bootstrap4')
    admin.add_view(ModelView(Usuario, db.session))
    admin.add_view(ModelView(Vehiculo, db.session))
    admin.add_view(ModelView(Monedero, db.session))
    admin.add_view(ModelView(Puntuacion, db.session))
    admin.add_view(ModelView(Viaje, db.session))


