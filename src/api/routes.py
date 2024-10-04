"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users,Posts,Characters,Planets
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import requests


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] =  "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not user:
        response_body['message'] = 'Bad email or password'
        return response_body, 401
    print('************ Valor de user *************:', user.serialize())
    access_token = create_access_token(identity={'email': user.email, 'user_id': user.id, 'is_admin': user.is_admin})
    response_body['message'] = f'Bienvenido {email}'
    response_body['access_token'] = access_token
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body['logged_in_as'] = current_user
    return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La Publicación: {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    current_user = get_jwt_identity()
    if row.user_id != current_user['user_id']:
        response_body['message'] = f'Usted no puede gestionar la publicación: {id}'
        response_body['results'] = {}
        return response_body, 401
    if request.method == 'GET':
        response_body['message'] = f'Datos de la Publicación: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        print(data)
        # Validad que reciba todas las claves en body (json)
        # Asigno las claves del json a la columna correspondiente
        row.title = data.get('title')
        row.description = data.get('description')
        row.body = data.get('body')
        row.date = datetime.now()
        row.image_url = data.get('image_url')
        db.session.commit()
        response_body['message'] = f'Publicación: {id} modificada - (PUT)'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Publicación: {id} eliminada - (DELETE)'
        response_body['results'] = {}
        return response_body, 200



#Endpoints

@api.route('/people', methods=['GET'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Characters)).scalars()
        result = [row.serialize() for row in rows]
        #opcion 2 :
        #result = []
        #for row in rows:
            #result.append(row.serialize())
        response_body['message'] = 'Listado de Publicaciones'
        response_body['results'] = result
        return response_body, 200
    #if request.method == 'POST':
    #    data = request.json
    #    # Validar si estoy recibiendo todas las claves(campos)
    #    row = Characters(name = data.get('name'),
    #                     height = data.get('height'),
    #                     mass = data.get('mass'),
    #                     hair_color = data.get('hair_color'),
    #                     skin_color = data.get('skin_color'),
    #                     eye_color = data.get('eye_color'),
    #                     birth_year = data.get('birth_year'),
    #                     gender = data.get('gender'),)
    #    db.session.add(row)
    #    db.session.commit()
    #    response_body['message'] = 'Creando Publicaciones'
    #    response_body['results'] = row.serialize()
    #    return response_body, 200


@api.route('/people/<int:id>', methods=['GET'])
def post(id):
    response_body = {}
    # Validar que id exista en la base de datos
    row = db.session.execute(db.select(Characters).where(Characters.id == id).scalar())
    if not row:
        response_body['message'] = f'Datos Publicación: {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Datos Publicación: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
   # if request.method == 'PUT':
   #     data = request.json
   #     response_body['message'] = f'Datos Publicación Modificados: {id}'
   #     response_body['results'] = {}
   #     return response_body, 200
    # if request.method == 'DELETE':
    #    db.session.delete(row)
    #    db.session.commit()
    #    response_body['message'] = f'Datos Publicación Eliminados: {id}'
    #    response_body['results'] = {}#
    #   return response_body, 200
    response_body['parametro'] = id
    return response_body, 200


@api.route('/planets', methods=['GET'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Planets)).scalars()
        result = [row.serialize() for row in rows]
        #opcion 2 :
        #result = []
        #for row in rows:
            #result.append(row.serialize())
        response_body['message'] = 'Listado de Publicaciones'
        response_body['results'] = result
        return response_body, 200
    

@api.route('/planets/<int:id>', methods=['GET'])
def post(id):
    response_body = {}
    # Validar que id exista en la base de datos
    row = db.session.execute(db.select(Planets).where(Planets.id == id).scalar())
    if not row:
        response_body['message'] = f'Datos Publicación: {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Datos Publicación: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    response_body['parametro'] = id
    return response_body, 200


