import jwt


class TokenController:
    """Class for encoding and decoding JWT tokkens """

    def __init__(self, secret):
        """Init method that creates instance of TokkenController class

            inputs:
                    secret - secret key that used for encoding
        """
        self._secret = secret

    def create_token(self, username, id):
        """Creates jwt token that encodes dict with username and user id

            inputs:
                    username - name that user picked during registration
                    id - index of user in data base
            return:
                    jwt tokken in string format
        """
        return str(jwt.encode({"username": username, "id": id}, self._secret), "UTF-8")

    def decode_token(self, token):
        """Decodes received token

            inputs:
                    token - encoded token recived from client
            return:
                    dict that was encoded in this token
        """
        return jwt.decode(token, self._secret)
