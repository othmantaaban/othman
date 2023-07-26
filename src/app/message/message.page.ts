import { ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessageService } from './service/message.service';
import { IonAccordionGroup, PopoverController } from '@ionic/angular';
import { FileService } from '../globalService/file.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild("messageGroup") group: IonAccordionGroup
  public messagesNonLus: Array<any> = [];
  public messagesLus: Array<any> = [];
  public selectedMsg: Array<any> = undefined;
  public MsgIsLoad: Boolean = false;
  public textVal: string;
  public filesVal: Array<File> = null;
  private observe;
  public selectedOne: number = undefined;

  constructor(
    private messageService: MessageService,
    private file: FileService,
    private popoverController: PopoverController,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
  ) {
    // const x = ImagePicker
    // ImagePicker.getPictures({
    //   maximumImagesCount: 2
    // });
    // ImagePicker.getPictures
    
   }
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.initialize()
  }

  initialize() {
    let messages: any = this.messageService.getMessage();
    messages.subscribe((elt) => {
      this.messagesNonLus = elt?.messages_non_lu;
      this.messagesLus = elt?.messages_lu;
      this.cdr.detectChanges();
    })
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

  private fetchMsg(userTo: number, type: string = null) {

    this.observe = this.messageService.getConversationMsg(userTo, type)
    this.observe.subscribe((elt) => {
      this.selectedMsg = elt
      console.log(this.selectedMsg);

      setTimeout(() => {
        this.MsgIsLoad = false;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.scrollDown(userTo);
        }, 100)
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

        this.fetchMsg(+userId, type);

        // }, 300);
        // this.TimeoutGenerale = setTimeout(() => {


        // }, 100)
      } else {
        // this.selectedMsg = undefined
      }
    }
  }

   downloadFile(fileUrl: string, name) {
    this.file.downloadFile(fileUrl, name)
  }

  sendMsg($event, isLus: boolean) {
    $event.stopPropagation();

    if (!!this.textVal || !!this.filesVal) {
      let userId = this.group.value
      if (isNaN(+userId)) {
        userId = (<string>userId).split('-')[1]
      }
      this.selectedOne = +userId
      let text = this.textVal
      this.createRow(+userId, isLus)
      this.scrollDown(+userId)


      this.messageService.sendMessage(+userId, "administration", text, this.filesVal, "send").subscribe((elt) => {

      })
    }
  }

  async selectImages(event = null) {
    this.filesVal = await this.file.pickImages()
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
    console.log(this.selectedMsg);

    this.selectedMsg.push(newMessage)
  }

  async presentPopover(e: Event) {
    
  }
}
