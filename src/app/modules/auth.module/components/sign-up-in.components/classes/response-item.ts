// Response from server, that can be created from JSON
export class ItemResponse {
    // result of the request
    result: string;

    // error that occured during verificating of email, can be null
    email_error: string;

    // error that occured during verificating of username, can be null
    displayNameError: string;

    // error that occured during verificating of password, can be null
    password_error: string;

    // error that occured if repeted password is not same as firs entered password
    repeatedPasswordError: string;

    // JWT authorization token, that is given after succsesfull login
    token: string;

    // Username that should be saved in lockal storage
    username: string;
}