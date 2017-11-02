// service to request beartato picture

import { Injectable } from "@angular/core"
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BeartatoService {

    // URI for picture
    pictureURI: string;

    // link to rest api server
    private restAPILink = "http://127.0.0.1:5000";

    // injecting http client
    constructor(private http: Http) {
    }

    // function to request new image
    getPictureURI(): Observable<string>{
        
        return this.http.get(this.restAPILink + '/picture/')
                        .map(res => res.json().image_source)      
    }

}