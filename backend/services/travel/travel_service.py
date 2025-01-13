# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#  SERVICIO DEDICADO PARA LA INFORMACIÓN DE LOS VIAJES  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #

from flask import Blueprint, jsonify

# Nombre único para evitar conflictos
travel_blueprint = Blueprint('travel', __name__)

@travel_blueprint.route('/info', methods=['GET'])
def get_travel_info():
    return jsonify({'destination': 'Paris', 'price': 120})