// socket service to emit messages and recive them

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from '../clasess/message';
import { Http } from "@angular/http"

import 'rxjs/add/operator/toPromise';

// import 3rd paty socket io library
import * as socketIo from 'socket.io-client';

@Injectable()
export class SocketService {

    private socket;
    private restAPILink = "http://127.0.0.1:5000";

    // inject http client
    constructor(private http: Http){}

    // initialize socket connetion
    public initSocket(): void {
        this.socket = socketIo(this.restAPILink);
    }

    // send message event with message item
    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    // function that runs when message event is emited. Returns message data
    public onMessage(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
        });
    }

    // gets history of messages
    public getHistory(username: string, token: string): Promise<Message[]> {
        const body = ({username: username,
                       token: token})
        return this.http
                   .post(this.restAPILink+"/chat/", body)
                   .toPromise()
                   .then(result => result.json() as Message[])
                   
    }

}