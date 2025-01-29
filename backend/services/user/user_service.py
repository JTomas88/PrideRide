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

    codificar_password = generate_password_hash(data['password'])
    nuevo_usuario = Usuario(
        nombre=data['nombre'],
        apellidos=data['apellidos'],
        email=data['email'],
        password=codificar_password,
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
# LOGIN
#
@user_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Buscar al usuario en la base de datos
    usuario = Usuario.query.filter_by(email=email).first()

    if usuario is None:
        return jsonify({'Error': "No se ha encontrado el correo"}), 404

    # Verificar si la contraseña coincide
    if not check_password_hash(usuario.password, password):
        return jsonify({'Error': 'Contraseña incorrecta'}), 401

    # Crear el token de acceso
    access_token = create_access_token(identity=usuario.id)

    return jsonify({
        'id': usuario.id,
        'nombre': usuario.nombre,
        'apellidos': usuario.apellidos,
        'biografia': usuario.biografia,
        'direccion': usuario.direccion,
        'rol': usuario.rol,
        'telefono': usuario.telefono,
        'vehiculos': usuario.vehiculos,
        'email': usuario.email,
        'access_token': access_token
    }), 200

#
# OBTENER TODOS LOS USUARIOS
#
@user_blueprint.route('/obtener_usuarios', methods=['GET'])
def obtener_usuarios():
    listaUsuarios = Usuario.query.all()
    return jsonify([usuarios.serialize() for usuarios in listaUsuarios])