// Main router module. Contains default path and path for not founded pages

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PageNotFound } from "./components/page-not-found.component/page-not-found.component";

// Routes of default module
const routes: Routes = [
    {path: "", redirectTo: "/main", pathMatch: "full"},
    {path: "**", component: PageNotFound}
]

@NgModule ({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRouterModule {}