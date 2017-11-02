// Player component, that displayes and controls playing of music, song name and volume of music

import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SongNameService } from "../../services/song-name.service"
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@Component({
    selector: "player-component",
    templateUrl: "./player.component.html",
    styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit, AfterViewInit {

    // switch that tells is currently any music playing 
    isPlaing: boolean;

    // current song name
    songName: string;

    // ?
    isAlive: boolean;


    // injecting service that retrives song name
    constructor(private songNameService: SongNameService){}

    // Initializing component
    ngOnInit(){
        // We are not playing any song on the start of init
        this.isPlaing = false;

        // creates interval observable that will ask for song name after every seccond
        IntervalObservable.create(1000)
                          .subscribe(() => {
                              this.songNameService.getSong()
                                  .subscribe(data => {this.songName = data})
                          })
    }

    // After view intialized function
    ngAfterViewInit() {
        // Supposed to change voluem to 50 as a default, but doesn't do anything
        // can be removed
        this.volumeChange(50);
    }

    // function to play music
    play(): void {
        // get dom element that responcible for playing music
        let audioPlayer= document.getElementById('player') as HTMLMediaElement;

        // starts playing music
        audioPlayer.play()

        // sets switch to true to show that music is playing
        this.isPlaing = true;
    }

    // function to stop music that is currently playing
    stop(): void {
        // get dom element that responcible for playing music
        let audioPlayer= document.getElementById('player') as HTMLMediaElement;

        // stops music
        audioPlayer.pause()

        // sets switch to false to show that music is not playing currently
        this.isPlaing = false;
    }

    // changes voluem of music
    // input : 
    //        volume - desired volume 
    volumeChange(volume: number): void {
        // get dom element that responcible for playing music
        let audioPlayer= document.getElementById('player') as HTMLMediaElement;

        // sets volume as fraction of 1
        audioPlayer.volume = volume/100;
    }

}
