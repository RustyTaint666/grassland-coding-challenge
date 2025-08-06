import { Component, Input } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'app-base-message',
  template: '',
  styles: []
})
export abstract class BaseMessageComponent {
  @Input() abstract message: Message;

  get isFromAnna(): boolean {
    return this.message.from === 'Anna';
  }
}
