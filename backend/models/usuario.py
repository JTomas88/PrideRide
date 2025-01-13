from extensions import db
from enum import Enum

class RolUsuarioEnum(Enum):
    usuario = "usuario"
    admin = "admin"
    moderador = "moderado"

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellido_uno = db.Column(db.String(250), nullable=False)
    apellido_dos = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(250))
    password = db.Column(db.String(250))
    telefono = db.Column(db.String(9))
    biografia = db.Column(db.String(50))
    vehiculos = db.Column(db.String(100))
    direccion = db.Column(db.String(200))
    rol = db.Column(db.String(50), nullable=False, default=RolUsuarioEnum.usuario.value)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido_uno": self.apellido_uno,
            "apellido_dos": self.apellido_dos,
            "email": self.email,
            "password": self.password,
            "telefono": self.telefono,
            "biografia": self.biografia,
            "vehiculos": self.vehiculos,
            "direccion": self.direccion,
            "rol": self.rol
        }
