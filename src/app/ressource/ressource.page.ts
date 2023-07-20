import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular';
import { NotificationService } from '../dashboard/services/notification.service';
import { ResourceService } from './service/resource.service';
import { FileService } from '../globalService/file.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.page.html',
  styleUrls: ['./ressource.page.scss'],
})
export class RessourcePage implements OnInit {

  @ViewChild('ressourceAccordion') group: IonAccordionGroup;



  accordionVal: any = null;
  messageSuccess: string = '';
  validated_ressources: Array<any> = [];
  non_validated_ressources: Array<any> = [];
  ressourceContent: Object = {};
  contentIsLoad: boolean = false;
  dataIsLoad: boolean = false;
  ressources: Array<any> = []


  constructor(
    private notificationService: NotificationService,
    private ressourcesService: ResourceService,
    private file: FileService,
    private cdr: ChangeDetectorRef,
  ) { }

  private sendNotification(countNot: number) {

    this.notificationService.getNotification(JSON.stringify({ ressource: countNot }))
  }

  ngOnInit(): void {
    this.dataIsLoad = true;

  }

  ionViewWillEnter() {
    this.dataIsLoad = true;
    this.initialize();
  }

  ionViewWillLeave() {
    this.group.value = undefined
  }
  initialize() {
    this.non_validated_ressources = [];
    this.validated_ressources = [];
    const data = this.ressourcesService.getRessources();
    data.subscribe((res: any) => {
      this.non_validated_ressources = res.non_validated_ressources;
      this.validated_ressources = res.validated_ressources;
      this.group.value = undefined
      this.cdr.detectChanges();
      this.sendNotification(res.non_validated_ressources.length)
      this.dataIsLoad = false
    });


  }
  getRessourceContent() {
    const ressourceId = this.group.value;
    if (ressourceId !== undefined) {
      console.log("start", new Date());
      
      // console.log(this.contentIsLoad, "hello 2");
      const data = this.ressourcesService.getRessourceContent(+ressourceId);
      data.subscribe((elt) => {
        this.ressourceContent = elt;

        this.contentIsLoad = false;
        this.cdr.detectChanges();
        console.log("done", new Date());
      })
    }

  }

  valideRessource($event, ressourceId: number, action: string = null) {
    const data = this.ressourcesService.setRessourceValid(ressourceId, action);
    data.subscribe((res: any) => {
      // this.validateressourceAnimation($event, res)
      const eltRef = $event.target.closest('ion-col');
      this.notificationService.validateAnimation(eltRef, () => {
        this.initialize()
        console.log(eltRef);
        eltRef.remove()
        this.notificationService.presentToast(res.msg, res.valide)
      })
    });
  }


  downloadFile(fileUrl: string, name) {
    this.file.downloadFile(fileUrl, name)
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
        console.log(this.group.value);
      
        this.notificationService.openValidation(eltRef, () => {})
      }
      }, 100)
    
    
  }
  splitFileNameToArray(name: string): string[] {
    return name.split('.');
  }


}
