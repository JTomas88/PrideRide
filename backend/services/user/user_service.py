# # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#  SERVICIO DEDICADO PARA LA INFORMACIÓN DEL USUARIO  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # 

from datetime import datetime
from flask import Blueprint, jsonify, Response,  request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from extensions import db
from sqlalchemy.orm import joinedload 
from models import Usuario, Monedero, RolUsuarioEnum


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
    nuevo_usuario = Usuario (
        nombre=data['nombre'],
        apellidos=data['apellidos'],
        email=data['email'],
        password=codificar_password,
        telefono=data.get('telefono'),
        biografia=data.get('biografia'),
        direccion=data.get('direccion'), 
        rol=data.get('rol', RolUsuarioEnum.usuario.value),
        carnet_conducir_verificado=data.get('carnet_conducir_verificado', False),
        numero_carnet_conducir=data.get('numero_carnet_conducir'),
        fecha_vencimiento_carnet=datetime.strptime(data['fecha_vencimiento_carnet'], '%Y-%m-%d') 
        if data.get('fecha_vencimiento_carnet') else None
    )

    db.session.add(nuevo_usuario)
    db.session.commit()

    nuevo_usuario.monedero = Monedero()
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
        'usuario': usuario.serialize(),
        'access_token': access_token
    }), 200

#
# OBTENER TODOS LOS USUARIOS
#
@user_blueprint.route('/obtener_usuarios', methods=['GET'])
def obtener_usuarios():
    lista_usuarios = Usuario.query.options(
        joinedload(Usuario.vehiculos),
        joinedload(Usuario.monedero),
        joinedload(Usuario.puntuaciones)
    ).all()
    return jsonify([usuario.serialize() for usuario in lista_usuarios])


#
# ACTUALIZAR DATOS DEL USUARIO
#
@user_blueprint.route('/<int:user_id>', methods=['PUT'])
def actualizar_usuario(user_id):
    usuario = Usuario.query.get_or_404(user_id)
    data = request.json
    
    for key in ['nombre', 'apellidos', 'telefono', 'biografia', 'direccion']:
        if key in data:
            setattr(usuario, key, data[key])
    
    db.session.commit()
    return jsonify(usuario.serialize()), 200