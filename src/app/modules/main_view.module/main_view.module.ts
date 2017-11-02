// Module that displayes main window, with chat and beartato pictures

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule} from '@angular/forms';

import { MainViewComponent } from "./main_view.component"

import { BeartatoService } from "./services/beartato.service";
import { BeartatoComponent } from "./components/beartato.component/beartato.component"

import { ChatComponent } from "./components/chat.component/chat.component"
import { SocketService } from "./services/socket.service"

import {MainRouterModule} from "./modules/main-router.module"

@NgModule({
    declarations: [BeartatoComponent, MainViewComponent, ChatComponent],
    imports: [
        BrowserModule,
        HttpModule,
        MainRouterModule,
        FormsModule
      ],
    exports: [],
    providers: [BeartatoService, SocketService],
})
export class MainViewModule{}