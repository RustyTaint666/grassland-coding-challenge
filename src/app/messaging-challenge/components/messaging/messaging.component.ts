import { Component } from '@angular/core';
import {MessagingViewModel} from "./messaging.view-model";

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent {

  constructor(public viewModel: MessagingViewModel) {}
}
