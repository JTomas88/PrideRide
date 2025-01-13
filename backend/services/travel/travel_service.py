# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#  SERVICIO DEDICADO PARA LA INFORMACIÓN DE LOS VIAJES  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #

from flask import Blueprint, jsonify

travel_blueprint = Blueprint('travel', __name__)

@travel_blueprint.route('/info', methods=['GET'])
def get_user_info():
    return jsonify({'travel_name': 'viaje 1', 'date': '13/01/2025'})