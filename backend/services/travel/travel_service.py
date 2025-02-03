# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#  SERVICIO DEDICADO PARA LA INFORMACIÓN DE LOS VIAJES  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import Viaje
from extensions import db

travel_blueprint = Blueprint('travel', __name__)

@travel_blueprint.route('/crear', methods=['POST'])
@jwt_required() 
def crear_viaje():
    data = request.json
    usuario_id = get_jwt_identity()

    campos_obligatorios = ['origen', 'destino', 'plazas', 'hora_salida', 'fecha_salida', 'ruta_seleccionada']
    for campo in campos_obligatorios:
        if campo not in data:
            return jsonify({"error": f"Falta el campo obligatorio: {campo}"}), 400

    try:
        fecha_salida = datetime.strptime(data['fecha_salida'], '%Y-%m-%dT%H:%M:%S')
    except ValueError:
        return jsonify({"error": "Formato de fecha de salida no válido"}), 400

    nuevo_viaje = Viaje(
        origen=data['origen'],
        destino=data['destino'],
        plazas=int(data['plazas']),
        hora_salida=data['hora_salida'],
        fecha_salida=fecha_salida,
        ruta_seleccionada=data['ruta_seleccionada'],
        usuario_id=usuario_id
    )

    db.session.add(nuevo_viaje)
    db.session.commit()

    return jsonify({
        "mensaje": "Viaje creado correctamente",
        "viaje": nuevo_viaje.serialize()
    }), 201