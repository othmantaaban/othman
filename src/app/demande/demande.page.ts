import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { AlertController, IonAccordionGroup, IonAlert, IonModal, } from '@ionic/angular';
import { DemandeService } from './services/demande.service';
// import { HTMLIonAlertElement } from ''
@Component({
  selector: 'app-demande',
  templateUrl: './demande.page.html',
  styleUrls: ['./demande.page.scss'],
})
export class DemandePage implements OnInit {
  @ViewChild(IonAlert) alert: QueryList<IonAlert>;
  @ViewChild('myAlert') myAlert: ElementRef;
  @ViewChild('demandAccordion') group : IonAccordionGroup;
  @ViewChild(IonModal) modal : IonModal;
  radioValue = null
  collabRadioValue = null
  isModalOpen : boolean = false;
  collab : Object = null

  public demandesList : Array<any>= [];
  public demandeContent : Object = {};
  public responsable : Array<any> = [];


  constructor(
    private alertController: AlertController,
    private demandeService : DemandeService,
    private cdr : ChangeDetectorRef,

  ) {}

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.initialize()
  }

  initialize() {
    this.demandeService.getAllDemande().subscribe(elt => {
      console.log(elt);
      this.demandesList = elt.demande
      this.responsable = elt.responsable
      this.cdr.detectChanges()
    })
  }

  getDemandeContent() {
    const demandeId = this.group.value;

    console.log(demandeId);

    if (demandeId !== undefined) {
      const data = this.demandeService.getDemandeContent(+demandeId);
      data.subscribe((elt) => {
        this.demandeContent = elt;
        this.collabRadioValue = elt.responsable ? elt.responsable.id : null
        this.radioValue = elt.responsable ? 'add_collab' : null
        this.collab = elt.responsable ? elt.responsable : this.responsable[0]
        // this.cdr.detectChanges();
      })
    }

  }

  async closeAlert() {
    // this.checkedRad = null
    this.closeAlet()
  }

  willRadioChange(val) {
    // this.checkedRad = val.target.value
  }

  setChecked(id : number) {
    this.closeAlet()
  }

  async closeAlet() {
    let top = await this.alertController.getTop()
    if(top) {
      await top.dismiss()
    }
  }
  checkboxChanged(event: any) {
    // Keep the action sheet open when checkboxes are clicked
    event.stopPropagation();
  }

  async setModalOpen() {
    // this.isModalOpen = true
    await this.modal.present();
  }

  confirm() {
    this.modal.dismiss(this.collabRadioValue, 'confirm')
  }

  collabWillDissmiss($event : Event) {
    const ev = $event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail);
    } else {
      console.log("dissmiss");

    }

  }



}
