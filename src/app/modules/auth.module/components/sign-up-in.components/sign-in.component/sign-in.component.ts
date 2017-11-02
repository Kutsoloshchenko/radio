import { Component } from "@angular/core";
import { AuthService } from "../../../services/auth.service/auth.service";
import { ItemResponse } from "../classes/response-item";
import { InputLine } from "../classes/input-line";
import { JWTAuthService } from "../../../../../services/jwt-auth.service"
import { Router } from "@angular/router"

@Component({
    selector: "sign-in",
    templateUrl: "../sign-up-in.component.html",
    styleUrls: ["../sign-up-in.component.css"]
})
export class SignInComponent {

    // list of input fields that component has
    components: InputLine[];
    
    // title of the form
    title: string;
    
    // Constructor that initializes all lines, title and injects AuthService, JWRAuthService and Router service
    constructor(private signInService: AuthService, private jwtService: JWTAuthService, private router: Router) {

        this.components = [  new InputLine("Email*"),
                        new InputLine("Password*")
                     ]
        this.title = "Sign In Form"
    }

    // Function thats called when user presses button submit
    submit(){
        let response = this.signInService.authSignIn(this.components[0].value, this.components[1].value)
                          .then(server_response =>  response = server_response);
        
        if ( response) {

            if (response.result == "Fail") {
                // if result is Fail - display error message
                this.components[1].error = response.password_error;
            }
            else {
                // If everything is okay - then same username and jwt tokken to client
                this.jwtService.logUserIn(response.username, response.token)
                this.router.navigateByUrl("main")
            }
        }

                          
    }
}