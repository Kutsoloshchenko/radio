// chat message class, that can be parced from JSON

export class Message{
    // result of request
    result: string;

    // message text
    message: string;

    // author of the message
    author: string;

    // jwt auth tokken probably not user, can be deleted
    token: string;

    // error message from server
    error_message: string;
}