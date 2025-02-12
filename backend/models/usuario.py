from models.enums import PreferenciasViajeEnum, RolUsuarioEnum, Genero, Orientacion
from extensions import db
from datetime import datetime
from enum import Enum




class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellidos = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    genero = db.Column(db.String(50), nullable=False, default=Genero.defecto.value)#
    orientacion = db.Column(db.String(50), nullable=False, default=Orientacion.defecto.value) #
    pronombre = db.Column(db.String(250), nullable=True)
    password = db.Column(db.String(250), nullable=False)
    telefono = db.Column(db.String(15))
    biografia = db.Column(db.String(500)) 
    fotoPerfil = db.Column(db.String(250), nullable=True)
    preferencias = db.Column(db.String(50), nullable=False, default=PreferenciasViajeEnum.silencio.value)
    rolPerfil = db.Column(db.String(50), nullable=False, default=RolUsuarioEnum.usuario.value)
    carnet_conducir_verificado = db.Column(db.Boolean, default=False)
    numero_carnet_conducir = db.Column(db.String(50))
    fecha_vencimiento_carnet = db.Column(db.Date)
    fecha_nacimiento = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # 
    # Relaciones
    # 

    # Relación de la tabla Vehículos con el usuario.
    vehiculos = db.relationship('Vehiculo', backref='usuario', cascade='all, delete-orphan')

    # Relación de la tabla Monedero con el usuario.
    monedero = db.relationship('Monedero', backref='usuario', uselist=False, cascade='all, delete-orphan')
    
    # Relación de la tabla Puntuación con el usuario.
    puntuaciones = db.relationship('Puntuacion', backref='usuario', cascade='all, delete-orphan', foreign_keys='Puntuacion.usuario_id')

    # Relación para las evaluaciones:
    # -> Evaluaciones realizadas (evaluador_id), 
    # 
    evaluaciones_realizadas = db.relationship(
        'Puntuacion', 
        foreign_keys='Puntuacion.evaluador_id', 
        backref='evaluador',
        cascade='all, delete-orphan'
    )

    @property
    def puntuacion_promedio(self):
        from statistics import mean
        return round(mean((p.puntuacion for p in self.puntuaciones)), 1) if self.puntuaciones else 0

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "email": self.email,
            "pronombre": self.pronombre,
            "telefono": self.telefono,
            "biografia": self.biografia,
            "preferencias": self.preferencias,
            "fotoPerfil": self.fotoPerfil,
            "rolPerfil": self.rolPerfil,
            "carnet_conducir_verificado": self.carnet_conducir_verificado,
            "numero_carnet_conducir": self.numero_carnet_conducir,
            "fecha_vencimiento_carnet": self.fecha_vencimiento_carnet.isoformat() if self.fecha_vencimiento_carnet else None,
            "fecha_nacimiento": self.fecha_nacimiento.isoformat() if self.fecha_nacimiento else None,
            "vehiculos": [v.serialize() for v in self.vehiculos],
            "monedero": self.monedero.serialize() if self.monedero else None,
            "puntuacion_promedio": self.puntuacion_promedio,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }
