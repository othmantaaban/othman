import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AbsenceService } from './service/absence.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.page.html',
  styleUrls: ['./absence.page.scss'],
})
export class AbsencePage implements OnInit {
  constructor
  (
    private Absence : AbsenceService
  )
  {}


  ngOnInit() {

      
    this.Absence.getAbsence().subscribe(elt => {
      console.log(elt);
    })
  }

}
