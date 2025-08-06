import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {MessagingService} from "../../services/messaging.service";
import {Message} from "../../models/message";
import {TextMessage} from "../../models/text-message";
import {ImageMessage} from "../../models/image-message";

@Injectable({
    providedIn: 'root'
})
export class MessagingViewModel {
    public readonly messages$: Observable<Message[]>;

    constructor(private messagingService: MessagingService) {
        this.messages$ = this.messagingService.messages$;
    }

    /**
     * Helper method to check if a message is a TextMessage.
     * This logic is now in the ViewModel.
     * @param message The message object to check.
     * @returns True if the message is a TextMessage, false otherwise.
     */
    isTextMessage(message: Message): message is TextMessage {
        return message instanceof TextMessage;
    }

    /**
     * Helper method to check if a message is an ImageMessage.
     * This logic is now in the ViewModel.
     * @param message The message object to check.
     * @returns True if the message is an ImageMessage, false otherwise.
     */
    isImageMessage(message: Message): message is ImageMessage {
        return message instanceof ImageMessage;
    }
}
