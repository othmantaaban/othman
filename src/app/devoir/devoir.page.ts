import { ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { AnimationController, IonAccordionGroup, ToastController } from '@ionic/angular';
import { DevoirService } from './services/devoir.service';
import { FileService } from '../globalService/file.service';
import { NotificationService } from '../dashboard/services/notification.service';
// import { FileTransfer, FileTransferObject } from 'cordova-plugin-file-transfer';
// import { File } from '@cordova-plugin-file-transfer';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.page.html',
  styleUrls: ['./devoir.page.scss'],
})
export class DevoirPage implements OnInit {
  @ViewChild('accordionGroup') group: IonAccordionGroup;



  accordionVal: any = null;
  messageSuccess: string = '';
  validated_devoirs: Array<any> = [];
  non_validated_devoirs: Array<any> = [];
  devoirContent: Object = {};
  contentIsLoad: boolean = false;
  dataIsLoad: boolean = false;
  devoirs: Array<any> = []


  constructor(
    private notificationService: NotificationService,
    private devoirsService: DevoirService,
    private file: FileService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.dataIsLoad = true;
  }

  private sendNotification(countNot: number) {
    // const countNot = this.non_validated_devoirs.length;

    this.notificationService.getNotification(JSON.stringify({ devoir: countNot }))
  }

  ionViewWillEnter() {
    this.dataIsLoad = true;
    const data = this.devoirsService.getDevoirs();
    this.initialize();
  }
  initialize() {
    this.non_validated_devoirs = [];
    this.validated_devoirs = [];
    const data = this.devoirsService.getDevoirs();
    data.subscribe((res: any) => {
      this.non_validated_devoirs = res.non_validated_devoirs;
      this.validated_devoirs = res.validated_devoirs;
      this.group.value = undefined
      this.cdr.detectChanges();
      this.sendNotification(res.non_validated_devoirs.length)
      this.dataIsLoad = false;
    });


  }
  ionViewWillLeave() {
    this.group.value = undefined
  }
  getDevoirContent() {
    const devoirId = this.group.value;

    if (devoirId !== undefined) {
      this.contentIsLoad = true
      // console.log(this.contentIsLoad, "hello 2");
      const data = this.devoirsService.getDevoirContent(+devoirId);
      data.subscribe((elt) => {
        // setTimeout(() => {
          this.devoirContent = elt;
          this.contentIsLoad = false;
        // }, 200)
        this.cdr.detectChanges();
      })
    }

  }

  valideDevoir($event, devoirId: number, action: string = null) {
    // $event.stopPropagation();
    const data = this.devoirsService.setDevoirValid(devoirId, action);
    data.subscribe((res: any) => {
      const eltRef = $event.target.closest('ion-col');
      this.notificationService.validateAnimation(eltRef, () => {
        this.initialize()
        console.log(eltRef);
        eltRef.remove()
        this.notificationService.presentToast(res.msg, res.valide)
      })
    });
  }


  downloadPic($event, fileUrl: string, name) {
    $event.preventDefault();

    console.log("pic doz");

    this.file.downloadImage(fileUrl, name)
  }

  downloadFile(fileUrl: string, name) {
    this.file.downloadFile(fileUrl, name)
  }


  seePdf(fileUrl, fileName : string) {
    const type = fileName.split(".")
    this.notificationService.openIFrame(fileUrl, fileName)
  }

  closeValidation(event: any, id: number) {
    const eltRef = event.target.closest('.validation');
    this.notificationService.closeValidation(eltRef, () => {})
  }

  async openValidation(event) {
    console.log(this.group.value);
    console.log(this.group.value !== undefined);

    setTimeout(()=> {
      this.cdr.detectChanges();
      if(this.group.value !== undefined) {
        const eltRef = event.target.closest("ion-accordion").querySelector(".validation")
        const x = event.target.closest("ion-accordion")
        console.log(x.querySelector(".validation"));

        this.notificationService.openValidation(eltRef, () => {})
      }
    }, 60)

  }




  @Output() passNotification = new EventEmitter();

  // runParentFunction() {
  //   this.passNotification.emit();
  //   console.log("child component");
  //   console.log(this.passNotification);
  // }
}
