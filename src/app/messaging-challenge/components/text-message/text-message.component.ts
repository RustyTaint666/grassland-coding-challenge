import { Component, Input } from '@angular/core';
import { BaseMessageComponent } from '../base-message/base-message.component';
import { TextMessage } from '../../models/text-message';

@Component({
    selector: 'app-text-message',
    templateUrl: './text-message.component.html',
    styleUrls: ['./text-message.component.scss']
})
export class TextMessageComponent extends BaseMessageComponent {
    @Input() override message!: TextMessage;

    constructor() {
        super();
    }
}
