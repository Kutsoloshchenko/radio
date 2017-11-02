// router for AuthModule 

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { SignUpComponent } from "../components/sign-up-in.components/sign-up.component/sign-up.component"
import { SignInComponent } from "../components/sign-up-in.components/sign-in.component/sign-in.component"

const routes: Routes = [
    {path: "sign_up", component:SignUpComponent},
    {path: "sign_in", component:SignInComponent},
]

@NgModule ({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class AuthRouterModule {}