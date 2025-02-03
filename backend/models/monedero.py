from extensions import db

class Monedero(db.Model):
    __tablename__ = 'monederos'

    id = db.Column(db.Integer, primary_key=True)
    saldo = db.Column(db.Numeric(10, 2), default=0.0)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), unique=True)

    def serialize(self):
        return {
            "id": self.id,
            "saldo": float(self.saldo) if self.saldo else 0.0,
            "usuario_id": self.usuario_id
        }
