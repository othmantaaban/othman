import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/globalService/global.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private global : GlobalService
  ) { }

  getDashboard() {
    const main = this.global.getHttpClient("slides")
    return main
    
    
  }
}
