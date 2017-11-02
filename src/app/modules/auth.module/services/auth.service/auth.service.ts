// Service that makes http request to server reguarding authorization 

import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ItemResponse } from "../../components/sign-up-in.components/classes/response-item"

import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService{

    // Rest API link
    private restAPILink = "http://127.0.0.1:5000"

    // constructor that injects HTTP client
    constructor(private http : Http){}

    // function that makes POST request to a server and passes sign up data
    authSignUp(email: string, displayName:string, password:string, repeatPassword:string): Promise<ItemResponse> {
        
        // creating body of POST request
        const body = ({email: email,
                               displayName: displayName,
                               password: password,
                               repeatPassword: repeatPassword})
        
        // making http request
        return this.http
                   .post(this.restAPILink + "/sign_up/", body)
                   .toPromise()
                   .then(res => res.json() as ItemResponse )
    }

    // function that makes POST request to a server and passes sign in data
    authSignIn(email: string, password:string): Promise<ItemResponse> {
        
        // creating body of POST request
        const body = ({email: email,
                       password: password
                     })
        
        // making http request
        return this.http
                   .post(this.restAPILink + "/sign_in/", body)
                   .toPromise()
                   .then(res => res.json() as ItemResponse )
    }

}