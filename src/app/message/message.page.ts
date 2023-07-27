import { ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from './service/message.service';
import { InfiniteScrollCustomEvent, IonAccordionGroup, IonContent, IonInfiniteScroll, IonRefresher, PopoverController } from '@ionic/angular';
import { FileService } from '../globalService/file.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild("messageGroup") group: IonAccordionGroup
  @ViewChild("messages") content : IonContent
  @ViewChild("infinity") infinity : IonInfiniteScroll
  // @ViewChild("") refresher : IonRefresher

  public messagesNonLus: Array<any> = [];
  public messagesLus: Array<any> = [];
  public selectedMsg: Array<any> = undefined;
  public MsgIsLoad: Boolean = false;
  public limit: Boolean = true;
  public textVal: string;
  public filesVal = null;
  private observe;
  public selectedOne: number = undefined;

  constructor(
    private messageService: MessageService,
    private file: FileService,
    private popoverController: PopoverController,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
  ) {
  }
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.initialize()
  }

  ionViewWillLeave() {
    // this.observe.unsubscribe()
    this.observe = undefined
    this.selectedMsg = undefined;
    this.MsgIsLoad = false
    this.selectedOne = undefined
    this.group.value = undefined
  }

  initialize() {
    let messages: any = this.messageService.getMessage();
    messages.subscribe((elt) => {
      this.messagesNonLus = elt?.messages_non_lu;
      this.messagesLus = elt?.messages_lu;
      this.cdr.detectChanges();
    })
  }

  loadMsg(event) {
    console.log(event);
    // (event as InfiniteScrollCustomEvent).target.complete()
    (event as InfiniteScrollCustomEvent).target.complete
    
    const other = this.group.value as string
    let type = null
    let userId = other
    if (isNaN(+other)) {
      type = 'eleve'
      userId = other.split('-')[1]
    }
    let limit = this.selectedMsg.length
    this.observe = this.messageService.getConversationMsg(+userId, type, limit)
    this.observe.subscribe(async (elt) => {
      // console.log(elt);
      if(elt.length < 10) {
        this.infinity.disabled = true
        
      }
  
      
      this.selectedMsg = [...elt, ...this.selectedMsg]
      console.log("before");
      console.log(this.selectedMsg);
      // setTimeout(async () => {
        await this.infinity.complete();
      // }, 1000)
      console.log("after");


    })
  }

  async scrollDown(elt = null) {
      if (this.content != null) {
        console.log(this.content);


        // if(elt.length < 10) {
        //   this.infinity.disabled = true            
        // } else {
        //   this.infinity.disabled = false
        //   // this.infinity.complete()
        // }
        this.content.scrollToBottom()
        // console.log(await this.infinity.complete());
        
      }
  }

  private fetchMsg(userTo: number, type: string = null) {

    this.observe = this.messageService.getConversationMsg(userTo, type)
    this.observe.subscribe((elt) => { 
      this.selectedMsg = elt
      console.log(this.selectedMsg);

      setTimeout(() => {
        this.MsgIsLoad = false;
        // const infinity = document.getElementById("infinity") 
      
        setTimeout(() => {
        
          this.scrollDown(elt);
        }, 100)
        this.cdr.detectChanges();
      }, 1000);
    })

  }

  accordionChange(event) {
    if (event.target.tagName !== "ION-TEXTAREA") {
      console.log();

      const other = this.group.value as string;
      console.log(other);
      if (this.observe) {
        console.log(this.observe);

        // this.observe.unsubscribe()
        this.observe = undefined
        this.selectedMsg = undefined;
        this.MsgIsLoad = false
        this.selectedOne = undefined
      }
      if (other !== undefined) {
        this.MsgIsLoad = true
        // setTimeout(() => {
        let type = null
        let userId = other
        if (isNaN(+other)) {
          type = 'eleve'
          userId = other.split('-')[1]
        }
        this.selectedOne = +userId

        this.fetchMsg(+userId, type);

      } else {
        // this.selectedMsg = undefined
      }
    }
  }

  downloadFile(fileUrl: string, name) {
    this.file.downloadFile(fileUrl, name)
  }

  sendMsg($event, isLus: boolean, channel : string = null) {
    $event.stopPropagation();

    if (!!this.textVal || !!this.filesVal) {
      let userId = this.group.value
      if (isNaN(+userId)) {
        userId = (<string>userId).split('-')[1]
      }
      this.selectedOne = +userId
      console.log(this.selectedOne);
      
      let text = this.textVal
      this.createRow(+userId, isLus)
      setTimeout(() => {
        this.scrollDown()
      }, 100);


      this.messageService.sendMessage(+userId, "administration", text, this.filesVal, "send").subscribe((elt) => {

      })
    }
  }

  async selectImages(event = null) {
    let images = await this.file.pickImages()
    this.filesVal = [...this.filesVal, ...images]
    console.log(this.filesVal);
    }

  loadData(){
    console.log("infinity");
    
  }

  createRow(val: number, isLus: boolean) {
    let d = new Date()
    let newMessage = {
      date: this.datePipe.transform(d, "H:mm"),
      hasFile: false,
      message: this.textVal,
      par: "",
      sendBy: "1"
    }
    if (isLus) {

      this.messagesLus.forEach((elt) => {
        if (elt.Id == val) {
          elt.lastMsg = this.textVal
        }
      })
    } else {

      this.messagesNonLus.forEach((elt) => {
        if (elt.Id == val) {
          elt.lastMsg = this.textVal
        }
      })

    }
    this.textVal = null
    this.filesVal = []
    console.log(this.selectedMsg);

    this.selectedMsg.push(newMessage)
  }

  async presentPopover(e: Event) {
    
  }
}
