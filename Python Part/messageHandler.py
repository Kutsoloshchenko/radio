class MessageHandler():
    """Class that handles work with all chat messages and events from DOPE radion"""

    def __init__(self, db, token):
        """Init method

            inputs:
                    bd - data base orm class to verify user info
                    token - jwt token decoder and encoder to decode recived jwt token
        """

        self._db = db
        self._token = token
        self._messages = []  # list of previous messages, message history

    def _verify_message(self, username, token):
        """Function to verify that user that sended message is legit

            inputs:
                    username - name of the user, that he picked on registration
                    token - string that was given to a user during sign in

            result:
                    True - if verification is successful
                    False - if verification is failed
        """

        # get used id of the provided username
        user_bd, id_bd = self._db.get_username_and_id(username=username)

        # decode token to received dict with user id an username that was encoded during sign in
        token_dict = self._token.decode_token(bytes(token, "UTF-8"))

        if username == token_dict["username"] and id_bd == token_dict["id"]:
            # is provided user name and user id is same as in decoded token that verification is successful
            return True
        else:
            return False

    def send_message(self, username, message, token):
        """Send message to all availible users, is user if verified one

            inputs:
                    sername - name of the user, that he picked on registration
                    message - text that user wishes to send to a chat
                    token - string that was given to a user during sign in

            returns:
                    result - dict with "result" (status) key, "message", "author" or "error_message" keys.
                             This dict will be sanded to all available and listening clients
        """

        if self._verify_message(username, token):
            result = {"result": "ok", "message": message, "author": username}
            self._add_to_history(result)  # add current message to the history
            return result
        else:
            return {"result": "Fail", "error_message": "Unauthorized access"}

    def _add_to_history(self, result):
        """Adds result dict of the send_message function to a message history

            inputs:
                    result - dict that was the result of send_message function
        """

        if len(self._messages) >= 20:
            self._messages.pop(0)

        self._messages.append(result)

    def get_history(self, username, token):
        """Sends history of messages to a client after verification of username and token

            inputs:
                    username - name of the user, that he picked on registration
                    token - string that was given to a user during sign in

            returns:
                    self._messages - list of results for last 20 messages
        """
        if self._verify_message(username, token):
            print(self._messages)
            return self._messages
        else:
            return {"result": "Fail", "error_message": "Unauthorized access"}