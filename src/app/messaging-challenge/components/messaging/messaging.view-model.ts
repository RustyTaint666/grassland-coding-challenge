import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {MessagingService} from "../../services/messaging.service";
import {Message} from "../../models/message";

@Injectable({
    providedIn: 'root'
})
export class MessagingViewModel {
    public readonly messages$: Observable<Message[]>;

    constructor(private messagingService: MessagingService) {
        this.messages$ = this.messagingService.messages$;
    }
}
