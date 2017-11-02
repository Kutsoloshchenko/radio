// Module that governs music player and lower bar that gives control over music

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { PlayerComponent } from "./components/player.component/player.component"

import { SongNameService } from "./services/song-name.service";

@NgModule({
    declarations: [PlayerComponent],
    imports: [
        BrowserModule,
        HttpModule,
      ],
    exports: [PlayerComponent],
    providers: [SongNameService],
})
export class RadioModule{}