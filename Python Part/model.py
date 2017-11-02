from validation import Validator
from orm import DataBase
from token_controler import TokenController
from beartatoHandler import get_beartato
from messageHandler import MessageHandler
from emailHandler import EmailHandler
import os

class Model:
    """Model class that handles all requests and work, by calling correct functions of specified modules"""
    def __init__(self):
        """ Initialize function, creates instances on needed classes"""

        # creates data base orm class
        self._db = DataBase()

        # creates class that handle user validation
        self._validator = Validator(self._db)

        # imports secret key from config file and creates token controller class instance
        from config import SECRET_KEY
        self._jwt_token_creator = TokenController(SECRET_KEY)

        # creates instance of message handler class
        self._message_handler = MessageHandler(self._db, self._jwt_token_creator)

        # creates instance of email handler class
        self._email_handler = EmailHandler({"login": "", "password": ""},
                                           {"address": "smtp.gmail.com", "port": 587})

    def sign_up(self, display_name, email, password, repeted_password):
        """Calls validation function of validator class and returns response

            inputs:
                    display_name - username entered by user
                    email - email address entered by user
                    password - password entered by user
                    repeted_password - repeat of the password entered by user

            return:
                    response item returned by validator sign_up function

        """
        return self._validator.sign_up(display_name.lower(), email.lower(), password, repeted_password)

    def sign_in(self, email, password):
        """Calls sign_in function of validator class, and on success adds jwt token to the response object

            inputs:
                    email - email address entered by user
                    password - password entered by user
            return:
                    response item dict containing status, error, token and username keys

        """

        responce = self._validator.sign_in(email.lower(), password)
        if responce["result"] == "Ok":
            username, id = self._db.get_username_and_id(email)

            if username and id:
                responce["token"] = self._jwt_token_creator.create_token(username, id)
                responce["username"] = username
            else:
                raise AttributeError

        return responce

    def get_song_name(self):
        """Reads content of temp file and retrives name of the current playing song.
        This should be re-writen using rabit MQ or some other kind of message bus """

        with open(os.path.join("./temp.temp"), "r") as file:
            temp = file.read()
        return {"name": temp}

    def send_message(self, username, message, token):
        """Calls send message of the MessageHandler class, and returns its result

            inputs:
                    username - name of the current user
                    message - text that user inputted in chat
                    token - jwt token that was issued to this client

            return:
                    response dict of the MessageHandler.send_message() function

         """

        return self._message_handler.send_message(username, message, token)

    def get_chat_history(self, username, token):
        return self._message_handler.get_history(username, token)

    def get_image(self):
        """Gets image source, title and alternative title for beartato comic """
        return get_beartato()

    def _send_verification_email(self):
        """Sends verification email to specified email"""
        self._email_handler.send_verification_message("asdf", "asdfukmail@gmail.com", "aewargrherhaerh")