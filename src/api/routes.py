"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users, Posts
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import requests

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend."
    return response_body, 200


@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        # Opción 2
        # result = []
        # for row in rows:
        #    result.append(row.serialize())
        # Opción 1 - list comprehension
        # var  = [ objetivo for iterador in lista ]
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las Publicaciones (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        # validar si estoy recibiendo todas las claves (campos)
        row = Posts(title = data.get('title'),
                    description = data.get('description'),
                    body = data.get('body'),
                    date = datetime.now(),
                    image_url = data.get('image_url'),
                    user_id = data.get('user_id'),)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una Publicación (POST)'
        response_body['results'] = row.serialize()
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
        return response_body, 403
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

#Autenticacion
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
    response_body['results'] = user.serialize()
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body['logged_in_as'] = current_user
    return response_body, 200




# Endpoints
@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    url = "https://swapi.dev/api/people"
    response = requests.get(url)
    print(response)
    if response.status_code == 200:
        data = response.json()
        print(data)
        for row in data['results']:
            Character = Characters(
                name=row.get("name"),
                height=row.get("height"),
                mass=row.get("mass"),
                hair_color=row.get("hair_color"),
                skin_color=row.get("skin_color"),
                eye_color=row.get("eye_color"),
                birth_year=row.get("birth_year")
            )
            db.session.add(Character)
        db.session.commit()
        response_body['results'] = data
    return response_body, 200


@api.route('/planets', methods=['GET'])
def get_planets():
    response_body = {}
    url = "https://swapi.dev/api/planets"
    response = requests.get(url)
    print(response)
    if response.status_code == 200:
        data = response.json()
        print(data)
        for row in data['results']:
            Planet = Planets(
               name= row.get("name"),
               rotation_period= row.get("rotation_period"),
               orbital_period= row.get("orbital_period"),
               diameter= row.get("diameter"),
               climate= row.get("climate"),
               gravity= row.get("gravity"),
               terrain= row.get("terrain"),
               population= row.get("population")
            )
            db.session.add(Planet)
        db.session.commit()
        response_body['results'] = data
    return response_body, 200


@api.route('/users', methods=['GET'])
def get_users(): 
    response_body = {}
    users = db.session.execute(db.select(Users)).scalars()
    result = [user.serialize() for user in users]
    if not users:
        response_body['message'] = f'Datos Publicación: No existen usuarios'
        response_body['results'] = {}
        return response_body, 404

    response_body['message'] = f'Usuarios:'
    response_body['results'] = result
    return response_body, 200





    response_body = {}
    # Aquí puedes usar un user_id fijo
    user_id = 1  # Cambia esto según sea necesario

    existing_favorite = db.session.execute(db.select(Favorites).where(
            Favorites.user_id == user_id,
            Favorites.item_type == 'planet',
            Favorites.item_id == planet_id
            )).scalar()
    
    if existing_favorite:
        response_body['message'] = f'El planeta con ID {planet_id} ya está en tus favoritos.'
        return response_body, 400  

    new_favorite = Favorites(user_id=user_id, item_type='planet', item_id=planet_id)
    db.session.add(new_favorite)
    db.session.commit()
    response_body['message'] = f'Planeta con ID {planet_id} añadido a tus favoritos.'
    return response_body, 201  


