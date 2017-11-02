// component that displayes beartato pictures

import { Component, OnInit } from "@angular/core";
import { BeartatoService } from "../../services/beartato.service"
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@Component({
    selector: "beartato-component",
    templateUrl: "beartato.component.html",
    styles:  [`img {
                max-width: 500px;
                max-height: 500px;
                margin: 5px;
                 }
                .picture{
                    width: 500px;
                    height: 500px;
                    display: flex;
                    justify-content: center;
                }`]
})
export class BeartatoComponent implements OnInit {
    
    // path to the picture
    picture: string;

    //injecting beartato service
    constructor( private beartatoService: BeartatoService ){}

    ngOnInit(): void {

        // gets first picture of beartato right away
        this.beartatoService.getPictureURI().toPromise().then(data => this.picture = data)
        

        // gets new image each 15 seconds - probably better to do as a socket event
        IntervalObservable.create(15000)
                          .subscribe(() => {
                                            this.beartatoService.getPictureURI()
                                                                .subscribe( data => {this.picture = data})
        })
    }

}