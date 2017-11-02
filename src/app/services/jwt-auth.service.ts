/* Injectable service that stores and provides user names and jwt tokkens when user is logged in */

import { Injectable, EventEmitter } from "@angular/core"

@Injectable()
export class JWTAuthService {

    // event that emited every time username is changed
    usernameChange: EventEmitter<string> = new EventEmitter();

    // function to save username and security token
    logUserIn(username: string, token: string): void {

        // save token and username in client local storage 
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        // emit that username is changed
        this.usernameChange.emit(this.getUserName())
    }

    // Function to delete token and username
    logUserOut() {
        // Deletes token and username from local storage
        localStorage.removeItem('token');
        localStorage.removeItem("username");
        // emit that username is changed 
        this.usernameChange.emit(this.getUserName())
    }

    // Function to return username. Returnes null if username is not set
    getUserName(): string {
        if (localStorage.getItem('username'))
            { return localStorage.getItem('username') }
        else
            { return null}
    }

    // Function to return token. Returnes null if token is not set
    getToken(): string {
        if (localStorage.getItem('token'))
        { return localStorage.getItem('token') }
    else
        { return null}
    }

}