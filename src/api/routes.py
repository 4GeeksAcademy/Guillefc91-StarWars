"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Characters, Planets, Favorites
from datetime import datetime
import requests

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend."
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
    response_body['message'] = f'Bienvenido {email}'
    return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La Publicación: {id} no existe'
        response_body['results'] = {}
        return response_body, 404

    # Supongamos que usamos un user_id fijo para la prueba.
    user_id = 1  # Cambia esto según sea necesario

    if row.user_id != user_id:
        response_body['message'] = f'Usted no puede gestionar la publicación: {id}'
        response_body['results'] = {}
        return response_body, 401

    if request.method == 'GET':
        response_body['message'] = f'Datos de la Publicación: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
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


@api.route('/people/<int:id>', methods=['GET'])
def people_id(id):
    response_body = {}
    row = db.session.execute(db.select(Characters).where(Characters.id == id)).scalar()
    if not row:
        response_body['message'] = f'Datos Publicación: {id} no existe'
        response_body['results'] = {}
        return response_body, 404

    if request.method == 'GET':
        response_body['message'] = f'Datos Publicación: {id}'
        response_body['results'] = row.serialize()
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


@api.route('/planets/<int:id>', methods=['GET'])
def planets_id(id):
    response_body = {}
    row = db.session.execute(db.select(Planets).where(Planets.id == id)).scalar()
    if not row:
        response_body['message'] = f'Datos Publicación: {id} no existe'
        response_body['results'] = {}
        return response_body, 404

    if request.method == 'GET':
        response_body['message'] = f'Datos Publicación: {id}'
        response_body['results'] = row.serialize()
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


@api.route('/users/favorites', methods=['GET'])
def get_user_favorites():
    response_body = {}
    # Aquí puedes usar un user_id fijo o de otra manera, por ejemplo, el ID de un usuario en particular
    user_id = 1  # Cambia esto según sea necesario

    favorites = db.session.execute(db.select(Favorites).where(Favorites.user_id == user_id)).scalars()
    # Recorrer todos los favoritos 
    result = [fav.serialize() for fav in favorites]
    response_body['message'] = f'Favoritos del usuario: {user_id}'
    response_body['results'] = result
    return response_body, 200  


@api.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id):
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


@api.route('/favorite/people/<int:people_id>', methods=['POST'])
def add_favorite_people(people_id):
    response_body = {}
    user_id = 1  # Cambia esto según sea necesario

    existing_favorite = db.session.execute(db.select(Favorites).where(
            Favorites.user_id == user_id,
            Favorites.item_type == 'people',
            Favorites.item_id == people_id
            )).scalar()
    
    if existing_favorite:
        response_body['message'] = f'El personaje con ID {people_id} ya está en tus favoritos.'
        return response_body, 400

    new_favorite = Favorites(user_id=user_id, item_type='people', item_id=people_id)
    db.session.add(new_favorite)
    db.session.commit()
    response_body['message'] = f'Personaje con ID {people_id} añadido a tus favoritos.'
    return response_body, 201  


@api.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(planet_id):
    response_body = {}
    user_id = 1  # Cambia esto según sea necesario

    favorite = db.session.execute(db.select(Favorites).where(
            Favorites.user_id == user_id,
            Favorites.item_type == 'planet',
            Favorites.item_id == planet_id
            )).scalar()
    
    if not favorite:
        response_body['message'] = f'El favorito del planeta con ID {planet_id} no existe.'
        return response_body, 404  

    db.session.delete(favorite)
    db.session.commit()
    response_body['message'] = f'Planeta con ID {planet_id} eliminado de tus favoritos.'
    return response_body, 200  


@api.route('/favorite/people/<int:people_id>', methods=['DELETE'])
def delete_favorite_people(people_id):
    response_body = {}
    user_id = 1  # Cambia esto según sea necesario

    favorite = db.session.execute(db.select(Favorites).where(
            Favorites.user_id == user_id,
            Favorites.item_type == 'people',
            Favorites.item_id == people_id
            )).scalar()
    
    if not favorite:
        response_body['message'] = f'El favorito del personaje con ID {people_id} no existe.'
        return response_body, 404

    db.session.delete(favorite)
    db.session.commit()
    response_body['message'] = f'Personaje con ID {people_id} eliminado de tus favoritos.'
    return response_body, 200
