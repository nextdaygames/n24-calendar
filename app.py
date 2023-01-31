import flask
import logging
import sys
# from flask_cors import CORS
# from flask_session import Session

from implementation.configuration.applicationConfig import ApplicationConfig
app = flask.Flask(__name__,static_url_path='', static_folder='frontend/build')
app.config.from_object(ApplicationConfig)

# CORS(app)
# serverSession = Session(app)

from implementation.controller import controller

app.register_blueprint(controller)

app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

if __name__ == '__main__':
    app.run()