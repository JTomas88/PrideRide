from enum import Enum

class RolUsuarioEnum(Enum):
    usuario = "usuario"
    admin = "admin"
    moderador = "moderador"

class PreferenciasViajeEnum(Enum):
    hablar = "Hablar"
    escuchar = "Escuchar música"
    dormir = "Dormir"
    silencio = "Silencio"
