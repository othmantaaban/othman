import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/globalService/global.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  endPoint = "demande_ens";
  constructor(
    private global : GlobalService
  ) { }

  getAllDemande() {
    return this.global.getHttpClient(this.endPoint)
  }

  getDemandeContent(demandeId : number) {
    return this.global.getHttpClient(this.endPoint, { demandeId: demandeId });
  }
}
