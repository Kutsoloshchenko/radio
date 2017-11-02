// router for main view

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { MainViewComponent } from "../main_view.component"

const routes: Routes = [
    {path: "main", component:MainViewComponent},
]

@NgModule ({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class MainRouterModule {}