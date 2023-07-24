import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from './service/message.service';
import { IonAccordionGroup } from '@ionic/angular';
import { FileService } from '../globalService/file.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild("messageGroup") group : IonAccordionGroup
  public messagesNonLus: Array<any> = [];
  public messagesLus: Array<any> = [];
  public selectedMsg: Array<any> = undefined;
  public MsgIsLoad: Boolean = false;
  public textVal : string;
  // 

  constructor(
    private messageService: MessageService,
    private file : FileService,
    private renderer: Renderer2
  ) {}
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
    setTimeout(() => {
      let element = document.getElementById(`messages${id}`);

      if (element != null) {
        // console.log(element.scrollHeight);
        // element.scroll

        element.scrollTop = element.scrollHeight + 2000;
      }
    }, 100)
  }

  private fetchMsg(userTo: number, type : string = null) {
    let fetch = this.messageService.getConversationMsg(userTo, type).subscribe((elt) => {
      this.selectedMsg = elt
    })

  }

  accordionChange() {
    const other = this.group.value as string;
    console.log(other);
    if (other !== undefined) {
      this.MsgIsLoad = true
      // this.TimeoutGenerale = setTimeout(() => {
        let type = null
        let userId = other
        if(isNaN(+other)) {
          type = 'eleve'
          userId = other.split('-')[1]
        }

        this.fetchMsg(+userId, type);
        this.MsgIsLoad = false;
        setTimeout(() => {
          this.scrollDown(userId);
        }, 100)

        
      // }, 100)
    } else {
      // if(this.fetch) {
      //   this.fetch.unsubscribe()
      // }
      this.selectedMsg = undefined
    }
  }

  downloadFile(fileUrl: string, name) {
    this.file.downloadFile(fileUrl, name)
  }

  sendMsg($event) {
    const msgListing = $event.target.closest("ion-footer").previousElementSibling
    console.log(msgListing);
    
  //   <ion-row class="authUser">

  //   <ion-col class="col-image" size="2" *ngIf="+m.sendBy === 1">
  //     <ion-img src="assets/Ellipse1.png"></ion-img>
  //   </ion-col>
  // </ion-row>
    if (!!this.textVal) {
      let userId = this.group.value
      if(isNaN(+userId)) {
        userId = (<string>userId).split('-')[1]
      }
      let text = this.textVal
      this.createLine(msgListing)
      this.createRow(msgListing)
      this.scrollDown(+userId)

      this.messageService.sendMessage(+userId, "administration", text, null ,"send").subscribe((elt) => {

      })
    }
  }

  createLine(parent : HTMLElement) {
    let div = this.renderer.createElement("div");
    this.renderer.setAttribute(div, "class", "line")
    this.renderer.appendChild(parent, div)
  } 

  createRow(parent : HTMLElement) {
    let row = this.renderer.createElement("ion-row");
    this.renderer.setAttribute(row, "class", "authUser")


    let col = this.renderer.createElement("ion-col")
    this.renderer.setAttribute(col, "size", "9")
    let message = this.renderer.createElement("div");
    this.renderer.setAttribute(message, "class", "message")
    const text = this.renderer.createText(this.textVal);
    this.textVal = null
    this.renderer.appendChild(message, text)
    this.renderer.appendChild(col, message)

    this.renderer.appendChild(row, col)


    let colImg = this.renderer.createElement("ion-col")
    this.renderer.setAttribute(colImg, "size", "2")
    this.renderer.setAttribute(colImg, "class", "col-image")


    let Img = this.renderer.createElement("ion-img")
    this.renderer.setAttribute(Img, "src", "assets/Ellipse1.png")
    this.renderer.appendChild(colImg, Img)
    this.renderer.appendChild(row, colImg)


    this.renderer.appendChild(parent, row)
  }
}
