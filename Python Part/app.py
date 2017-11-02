"""Main file that import all flask related frameworks, and defines all rest API routes"""

from flask_api import FlaskAPI
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask import request, jsonify
from model import Model

app = FlaskAPI(__name__)
app.config.from_object("config")
CORS(app)
socketio = SocketIO(app)
# external libraries import and declaration

mod = Model()  # Model is an class that contains all functionality of the web site


@app.route("/sign_up/", methods=['POST'])
def sign_up():
    """Process of signing up"""

    data = request.json
    result = mod.sign_up(data["displayName"], data["email"], data["password"], data["repeatPassword"])
    return jsonify(result)


@app.route("/sign_in/", methods=['POST'])
def sign_in():
    """Process of signing in """

    data = request.json
    result = mod.sign_in(data["email"], data["password"])
    return jsonify(result)


@app.route("/song_name/", methods=['GET'])
def send_song_name():
    """Sends name of the song that currently is playing"""

    result = mod.get_song_name()
    return jsonify(result)


@app.route("/picture/", methods=['GET'])
def send_picture_uri():
    """Sends picture uri to a client, currently only Beartato comic"""

    result = mod.get_image()
    return jsonify(result)


@socketio.on('message')
def text(json):
    """Responce of "message" event sended out by client. This will emit this message to all available clients"""

    result = mod.send_message(json['author'], json['message'], json['token'])
    emit("message", result, json=True, broadcast=True)


@app.route("/chat/", methods=['POST'])
def chat_history():
    """Sends last 20 messages that were send before"""

    data = request.json
    result = mod.get_chat_history(data['username'], data['token'])
    return jsonify(result)

if __name__=="__main__":
    socketio.run(app)