import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/globalService/global.service';

@Injectable({
  providedIn: 'root',
})
export class DevoirService {
  private endPoint = 'devoirs_ens';

  constructor(private global: GlobalService) {}

  getDevoirs() {
    return this.global.getHttpClient(this.endPoint);
  }

  getDevoirContent(devoirId: number) {
    return this.global.getHttpClient(this.endPoint, { devoirId: devoirId });
  }

  setDevoirValid(devoirId: number, action: string = null) {
    let request : Object = {};
    if(action === null) {
      request = {
        devoirId: devoirId,
      }
    } else {
      request = {
        devoirId: devoirId,
        action: action
      }
    }
    return this.global.postHttpClient(this.endPoint, request);
  }
}
