import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/globalService/global.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private data : Array<any>;
  private endPoint = "message_ens"
  private messages = null;
  // private messagees : Subject<MessageEvent>
  constructor(
    private global : GlobalService
  ) {
    this.getMessage()
  }



  getMessage()  {
    const x = this.global.getHttpClient(this.endPoint)
   

    return x
  }

  getConversationMsg(otherId : number, type) {
    let x = this.global.getHttpClient(this.endPoint, { otherId : otherId, type: type })
    return x
    // return this.messages;
    // Observable.interval(1000)
    //   .startWith(0)
    //   .switchMap(() => this.global.getHttpClient(this.endPoint));
    // const x = this.global.getWebSocket(this.endPoint)
    // console.log(x);

    // x.map((res) => {
    //   console.log(res);

    // })
  }

  sendMessage(id: number , channel : string, message : string = null, files : Array<File> = null, type : string = null){
    // if(!!message || !!files) {
      console.log(message);
      const fileForm = files
      
      return this.global.postHttpClient(this.endPoint, { message : message, files: fileForm, channel : channel, Reqtype: type }, { converatation: id })
    // }

  }


}
