# # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#  SERVICIO DEDICADO PARA LA INFORMACIÓN DEL USUARIO  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # 

from flask import Blueprint, jsonify
from models.usuario import Usuario


# Nombre único para evitar conflictos
user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/info', methods=['GET'])
def get_user_info():
    return jsonify({'username': 'test_user', 'email': 'test_user@example.com'})


#Obtener todos los usuarios
@user_blueprint.route('/obtener_usuarios', methods=['GET'])
def obtener_usuarios():
    listaUsuarios = Usuario.query.all()
    return jsonify([usuarios.serialize() for usuarios in listaUsuarios])