from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    firs_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    body = db.Column(db.String, unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False)  # Valor por defecto
    image_url = db.Column(db.String)   # La url, la obtenmos de cloudinary


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, unique=False, nullable=False)


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('image', 'video', 'podcast', name='media_type'))
    url = db.Column(db.String)


class CharactersFavorites(db.Model):
    id = db.column(db.Integer, primary_key=True)


class Characters(db.Model):
    id = db.column(db.Integer, primary_key=True)
    name = db.column(db.String, unique=True, nullable=False)
    height = db.column(db.String, unique=False, nullable=False)
    mass = db.column(db.String, unique=False, nullable=False)
    hair_color = db.column(db.String, unique=False, nullable=False)
    skin_color = db.column(db.String, unique=False, nullable=False)
    eye_color = db.column(db.String, unique=False, nullable=False)
    birth_year = db.column(db.String, unique=False,nullable=False)
    gender = db.column(db.String, unique=False,nullable=False)


class Planets_favorites(db.Model):
    id = db.column(db.Integer, primary_key=True)
    name = db.column(db.String, unique=True, nullable=False)
    diameter = db.column(db.String, unique=False, nullable=False)
    rotation_period = db.column(db.String, unique=False, nullable=False)
    orbital_period = db.column(db.String, unique=False, nullable=False)
    gravity = db.column(db.String, unique=False, nullable=False)
    population = db.column(db.String, unique=False, nullable=False)
    climate = db.column(db.String, unique=False,nullable=False)
    terrain = db.column(db.String, unique=False,nullable=False)


class Planets_Favorites(db.Model):
    id = db.column(db.Integer, primary_key=True)
