import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/globalService/global.service';

@Injectable({
  providedIn: 'root'
})


export class AbsenceService  {

  constructor(
    private global : GlobalService
  ) {
  }


  getAbsence() {
    return this.global.getHttpClient('absences')
  }
}
