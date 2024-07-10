from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from model import db, SAR, Entity
from flask_cors import CORS
from sqlalchemy import asc, desc, cast, String
from schemas import SARModel, ValidationError, SuspiciousActivityCode
from v1 import v1 as v1_blueprint

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

CORS(app)

app.register_blueprint(v1_blueprint, url_prefix='/api/v1')

if __name__ == '__main__':
    app.run(debug=True)
