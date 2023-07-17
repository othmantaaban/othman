import { Component, OnInit } from '@angular/core';
import { MessageService } from './service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage {
  public messagesNonLus: Array<any> = [];
  public messagesLus: Array<any> = [];
  public selectedMsg: Array<any> = undefined;
  public MsgIsLoad: Boolean = false;

  constructor(private messageService: MessageService) {}

  ionViewWillEnter() {
    let messages: any = this.messageService.getMessage();
    this.messagesNonLus = messages?.messages_non_lu;
    this.messagesLus = messages?.messages_lu;
  }

  scrollDown(id) {
    setTimeout(() => {
      let element = document.querySelector(`#messages${id}`);

      if (element != null) {
        console.log(element.scrollHeight);
        element.scrollTop = element.scrollHeight;
      }
    }, 60);
  }

  private fetchMsg(userTo: number) {
    const fetch = this.messageService.getConversationMsg(userTo);
    fetch.subscribe((elt) => {
      console.log(elt);
      this.selectedMsg = elt;
    });
  }
  getMessages(userTo: number) {
    this.MsgIsLoad = true;

    this.fetchMsg(userTo);
    if (this.selectedMsg === undefined) {
      this.fetchMsg(userTo);
    }

    this.scrollDown(userTo);
    this.MsgIsLoad = false;
  }

  accordionChange($event) {
    const userTo = $event.target.value;
    if (userTo !== undefined) {
      this.MsgIsLoad = true;
      console.log(userTo);

      // setTimeout(() => {
      this.fetchMsg(userTo);
      if (this.selectedMsg === undefined) {
        this.fetchMsg(userTo);
      }
      this.scrollDown(userTo);
      // }, 6)

      this.MsgIsLoad = false;
    }
  }
}
