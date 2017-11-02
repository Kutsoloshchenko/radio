// Component that displayes online chat

import { Component, OnInit } from "@angular/core";
import { JWTAuthService } from "../../../../services//jwt-auth.service";
import { SocketService } from "../../services/socket.service";
import { Message } from "../../clasess/message";

@Component({
    selector: "chat-component",
    templateUrl: "chat.component.html",
    styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
    
    // name of the current user
    username: string;

    // text that user entered
    messageText: string;

    // log of messages to display in chat
    messages: Message[] = [];
    
        // injectin  JWTAuthService and SoketService
        constructor(private jwtAuth: JWTAuthService, private socket: SocketService){}
    
        ngOnInit(): void {

            // getting username and subscribe to user name change
            this.username = this.jwtAuth.getUserName()
            this.jwtAuth.usernameChange.subscribe(
            (user) => this.username = user );

            // initializing socket connection
            this.socket.initSocket()

            // Subscribe to recive new messages
            this.socket.onMessage()
            .subscribe((message: Message) => {
              this.messages.push(message);
            });

            // get chat history
            this.socket.getHistory(this.username, this.jwtAuth.getToken()).then(result => this.messages = result)

        }

        // Function that sends entered message
        private send(): void {
            // create message item with user tokken, name and message text
            let message_to_send: Message = new Message();
            message_to_send.author = this.username;
            message_to_send.token = this.jwtAuth.getToken()
            message_to_send.message = this.messageText;

            // send message to server
            this.socket.send(message_to_send)

            // reset message text
            this.messageText = null;
        }
}