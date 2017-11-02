/*Component that displayes upper title bar with site name, Sign In Sign Up and Sign Out buttons*/

import { Component, OnInit } from "@angular/core";
import {JWTAuthService} from "../../services//jwt-auth.service"

@Component({
    selector: "title-bar",
    templateUrl: "title-bar.component.html",
    styleUrls: ["title-bar.component.css"]
})
export class TitleBar implements OnInit {
    /*Name of the logged in user */
    username: string;

    /*Constructor in whitch jwtAuth service is injected */
    constructor(private jwtAuth: JWTAuthService){}

    ngOnInit(): void {

        /*Methor that is called during initialization of component*/

        this.username = this.jwtAuth.getUserName() // get user name first time

        this.jwtAuth.usernameChange.subscribe(
        (user) => this.username = user );          // subscribe to username chage to recive new one as soon as user log ins or logs out
    }

    logOut(): void {
        /*  Log out function, that calls jwtAuthService log user out function
            user name is set to null and event usernameChange should be emited */
        this.jwtAuth.logUserOut();
    }

}