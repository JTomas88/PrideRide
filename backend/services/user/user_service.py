# # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#  SERVICIO DEDICADO PARA LA INFORMACIÓN DEL USUARIO  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # 

from flask import Blueprint, jsonify, Response,  request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from extensions import db
from models.usuario import Usuario, RolUsuarioEnum


# Nombre único para evitar conflictos
user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/info', methods=['GET'])
def get_user_info():
    return jsonify({'username': 'test_user', 'email': 'test_user@example.com'})

#
# REGISTRAR USUARIO NUEVO
#
@user_blueprint.route('/registro', methods=['POST'])
def crear_usuario():
    data = request.json

    campos_obligatorios = ['nombre', 'apellidos', 'email', 'password']
    for campo in campos_obligatorios:
        if campo not in data:
            return jsonify({"error": f"Falta el campo obligatorio: {campo}"}), 400

    
    if Usuario.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El correo electrónico ya existe"}), 400

    nuevo_usuario = Usuario(
        nombre=data['nombre'],
        apellidos=data['apellidos'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        telefono=data.get('telefono'),
        biografia=data.get('biografia'),
        vehiculos=data.get('vehiculos'),
        direccion=data.get('direccion'), 
        rol=data.get('rol', RolUsuarioEnum.usuario.value)
    )

    db.session.add(nuevo_usuario)
    db.session.commit()

    access_token = create_access_token(identity=nuevo_usuario.id)

    return jsonify({
        "mensaje": "Nuevo usuario creado correctamente",
        "access_token": access_token,
        "usuario": nuevo_usuario.serialize()
    }), 201

#
# OBTENER TODOS LOS USUARIOS
#
@user_blueprint.route('/obtener_usuarios', methods=['GET'])
def obtener_usuarios():
    listaUsuarios = Usuario.query.all()
    return jsonify([usuarios.serialize() for usuarios in listaUsuarios])