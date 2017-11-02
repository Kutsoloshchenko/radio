// Service that requests currently playing song from server

import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class SongNameService {
    // songName
    songName: string;

    // rest api link
    private restAPILink = "http://127.0.0.1:5000";

    // injecting http client to class
    constructor(private http: Http) {}

    // making get request to recive song name
    getSong(): Observable<string>{
        return this.http
                   .get(this.restAPILink + "/song_name/")
                   .map(res => res.json().name)
    }
}