// Module that governs user sign in, sign up, password restoration

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule} from '@angular/forms';

import { SignUpComponent } from "./components/sign-up-in.components/sign-up.component/sign-up.component"
import { SignInComponent } from "./components/sign-up-in.components/sign-in.component/sign-in.component"

import { AuthService } from "./services/auth.service/auth.service"

import { AuthRouterModule } from "./modules/auth-router.module"

@NgModule({
    declarations: [
        SignUpComponent,
        SignInComponent
      ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AuthRouterModule
      ],
    providers: [AuthService],
})
export class AuthModule{}
