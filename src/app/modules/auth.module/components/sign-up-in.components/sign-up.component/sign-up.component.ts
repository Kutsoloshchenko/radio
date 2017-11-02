// Component that responseble for signing user up

import { Component } from "@angular/core";
import { AuthService } from "../../../services/auth.service/auth.service";
import { ItemResponse } from "../classes/response-item";
import { InputLine } from "../classes/input-line";

@Component({
    selector: "sign-up",
    templateUrl: "../sign-up-in.component.html",
    styleUrls: ["../sign-up-in.component.css"]
})
export class SignUpComponent {

    // list of input fields that component has
    components: InputLine[];

    // title of the form
    title: string;

    // Constructor that initializes all lines, title and injects AuthService
    constructor(private signUpService: AuthService) {

        this.components = [  new InputLine("Email*"),
                        new InputLine("Display name*"),
                        new InputLine("Password*"),
                        new InputLine("Repeted rassword*")
                     ]
        this.title = "Sign Up Form"
    }

    
    // Function thats called when user presses button submit
    submit(){
        // get server response item
        let response = this.signUpService.authSignUp(this.components[0].value, this.components[1].value, this.components[2].value, this.components[3].value)
                          .then(server_response => response = server_response);
        
        // if there is any responce
        if (response) {

            // if request failed
            if (response.result == "Fail") {
                // set input lines error messages to recived error messages
                this.components[0].error = response.email_error;
                this.components[1].error = response.displayNameError;
                this.components[2].error = response.password_error;
                this.components[3].error = response.repeatedPasswordError;
            }
            else {
                // should redirect to user verify step, but currently on prints something
                console.log("redirect to verify")
            }

        }

                          
    }
}