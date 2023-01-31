import flask
import logging
import sys
from flask_cors import CORS

app = flask.Flask(__name__,static_url_path='', static_folder='frontend/build')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from implementation.controller import controller
from implementation.healthRecords.healthRecordsController import healthRecordsController

app.register_blueprint(controller)
app.register_blueprint(healthRecordsController)

app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

if __name__ == '__main__':
    app.run()# --log-level=debug --log-file=-debug = True)