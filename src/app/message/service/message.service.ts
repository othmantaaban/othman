import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/globalService/global.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private data : Array<any>;
  private endPoint = "message_ens"
  constructor(
    private global : GlobalService
  ) {
    this.getMessage()
  }



  getMessage()  {
    const x = this.global.getHttpClient(this.endPoint)
    x.subscribe(elt => {
      this.data = elt
    })

    return this.data
  }

  getConversationMsg(otherId : number) {
    return this.global.getHttpClient(this.endPoint, { otherId : otherId })
  }


}
