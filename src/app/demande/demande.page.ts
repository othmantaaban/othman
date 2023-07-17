import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, Animation, AnimationController, IonAccordionGroup, IonAlert, IonSelect } from '@ionic/angular';
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
  radioValue = null


  public demandesList : Array<any>= [];
  public demandeContent : Object = {};
  public responsable : Object = {};


  constructor(
    private alertController: AlertController,
    private demandeService : DemandeService,
    private cdr : ChangeDetectorRef
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
        console.log(elt);

        // this.contentIsLoad = false;
        this.cdr.detectChanges();
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




}
