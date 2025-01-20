# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#  SERVICIO DEDICADO PARA LA INFORMACIÓN DE LOS VEHÍCULOS #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

from flask import Blueprint, jsonify


vehicle_blueprint = Blueprint('vehicle', __name__)

@vehicle_blueprint.route('/info', methods=['GET'])
def get_travel_info():
    return jsonify({'destination': 'Paris', 'price': 120})