import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/globalService/global.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  endPoint : string = "ressource_ens"
  constructor(
    private global : GlobalService
  ) { }



  getRessources() {
    return this.global.getHttpClient(this.endPoint);
  }

  getRessourceContent(ressourceId: number) {
    return this.global.getHttpClient(this.endPoint, { ressourceId: ressourceId });
  }

  setRessourceValid(ressourceId: number, action: string = null) {
    let request : Object = {};
    if(action === null) {
      request = {
        ressourceId: ressourceId,
      }
    } else {
      request = {
        ressourceId: ressourceId,
        action: action
      }
    }
    return this.global.postHttpClient(this.endPoint, request);
  }
}
