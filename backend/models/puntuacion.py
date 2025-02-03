from extensions import db
from datetime import datetime

class Puntuacion(db.Model):
    __tablename__ = 'puntuaciones'

    id = db.Column(db.Integer, primary_key=True)
    puntuacion = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.String(500))
    fecha = db.Column(db.DateTime, default=datetime.utcnow)

    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id', name="fk_puntuacion_usuario"), nullable=False)
    evaluador_id = db.Column(db.Integer, db.ForeignKey('usuarios.id', name="fk_puntuacion_evaluador"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "puntuacion": self.puntuacion,
            "comentario": self.comentario,
            "fecha": self.fecha.isoformat(),
            "usuario_id": self.usuario_id,
            "evaluador_id": self.evaluador_id
        }
