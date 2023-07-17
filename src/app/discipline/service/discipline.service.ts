import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/globalService/global.service';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(
    private global : GlobalService
  ) { }


  getDiscipline() {
    return this.global.getHttpClient("discipline")
  }
}
