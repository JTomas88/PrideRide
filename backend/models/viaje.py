from datetime import datetime
from extensions import db
import json

class Viaje(db.Model):
    __tablename__ = 'viajes'

    id = db.Column(db.Integer, primary_key=True)
    origen = db.Column(db.String(100), nullable=False)
    destino = db.Column(db.String(100), nullable=False)
    plazas = db.Column(db.Integer, nullable=False)
    hora_salida = db.Column(db.String(5), nullable=False)
    fecha_salida = db.Column(db.DateTime, nullable=False)
    ruta_seleccionada = db.Column(db.JSON, nullable=True)

    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    usuario = db.relationship('Usuario', backref='viajes')

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "origen": self.origen,
            "destino": self.destino,
            "plazas": self.plazas,
            "hora_salida": self.hora_salida,
            "fecha_salida": self.fecha_salida.isoformat(),
            "ruta_seleccionada": self.ruta_seleccionada,
            "usuario_id": self.usuario_id,
            "created_at": self.created_at.isoformat(),
        }
