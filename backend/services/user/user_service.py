# # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#  SERVICIO DEDICADO PARA LA INFORMACIÓN DEL USUARIO  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # 

from flask import Blueprint, jsonify

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/info', methods=['GET'])
def get_user_info():
    return jsonify({'username': 'test_user', 'email': 'test_user@example.com'})