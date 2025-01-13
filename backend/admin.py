from extensions import db
from models.usuario import Usuario
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    admin = Admin(app, name='PRIDERIDE BD', template_mode='bootstrap4')
    admin.add_view(ModelView(Usuario, db.session))
