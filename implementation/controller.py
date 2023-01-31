from flask import json, request, Blueprint, send_from_directory

controller = Blueprint('controller',__name__)

@controller.route("/")
def home():
    return send_from_directory("frontend/build",'index.html')