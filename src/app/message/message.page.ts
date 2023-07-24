import { Component, OnInit } from '@angular/core';
import { MessageService } from './service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  public messagesNonLus: Array<any> = [];
  public messagesLus: Array<any> = [];
  public selectedMsg: Array<any> = undefined;
  public MsgIsLoad: Boolean = false;

  constructor(private messageService: MessageService) {}
  ngOnInit() {
    let messages: any = this.messageService.getMessage();
    this.messagesNonLus = messages?.messages_non_lu;
    this.messagesLus = messages?.messages_lu;
  }
  ionViewWillEnter() {
    let messages: any = this.messageService.getMessage();
    this.messagesNonLus = messages?.messages_non_lu;
    this.messagesLus = messages?.messages_lu;


  }

  scrollDown(id) {
      let element = document.getElementById(`messages${id}`);
      console.log(element);

      if (element != null) {
        // console.log(element.scrollHeight);
        console.log(element.scrollHeight);
        // element.scroll

        element.scrollTop = element.scrollHeight + 2000;
      }
  }

  private fetchMsg(userTo: number, type : string = null) {
    const fetch = this.messageService.getConversationMsg(userTo, type)
    fetch.subscribe((elt) => {
      this.selectedMsg = elt
      console.log(elt);

    })

  }

  accordionChange($event) {
    const other = $event.target.value;

    if (other !== undefined) {
      let type = null
      let userId = other
      if(isNaN(+other)) {
        type = 'eleve'
        userId = other.split('-')[1]
        console.log(userId);
      }

      this.fetchMsg(userId, type);
      setTimeout(() => {
        this.scrollDown(userId);

      }, 600)

      this.MsgIsLoad = false;
    }
  }
}
