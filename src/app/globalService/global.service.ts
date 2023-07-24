import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs'
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // private url = "https://boti.education/p/demo/botiapi/admin_"
  private url = 'http://localhost/school_23/botiapi/';
  private subject = Subject<MessageEvent>
  private socket: any;
  constructor(private _http: HttpClient) {
   }

  getWebSocket(endPoint: string) {
    if(!this.socket) {
      this.socket = io(this.url + endPoint)
    }

    this.socket.on(event, (data) => {
      console.log(data);

    })

  }
  // getWebSocket(endPoint: string) {
  //   let testUrl = "ws://localhost/school_23/botiapi/"

  //   let ws = new WebSocket(testUrl + endPoint)
  //   console.log(ws);

  //   let observable = Observable.create((obs: Observer<MessageEvent>) => {
  //     ws.onmessage = obs.next.bind(obs);
  //     ws.onerror = obs.error.bind(obs)
  //     ws.onclose = obs.complete.bind(obs)
  //     return ws.close.bind(ws)
  //   })

  //   let observer = {
  //     next: (data: Object) => {
  //       if (ws.readyState === WebSocket.OPEN) {
  //         ws.send(JSON.stringify(data))
  //       }
  //     }
  //   }

  //   return Subject.create(observer, observable)
  // }



  getHttpClient(endPoint: string, params: Object = null) {
    let req;
    if (params !== null) {
      const httpParams = this.buildParams(params);
      req = this._http.get(`${this.url}${endPoint}`, { params: httpParams });
    } else {
      req = this._http.get(`${this.url}${endPoint}`);
    }
    return req;
  }

  private buildParams(params: Object): HttpParams {
    const keys = Object.keys(params);
    let queryParams = new HttpParams();

    keys.forEach((elt) => {
      queryParams = queryParams.append(`${elt}`, params[elt]);
    });

    return queryParams;
  }

  postHttpClient(endPoint: string, request: Object, params: Object = null) {
    let req;
    let formData = new FormData();
    console.log(request);
    for (var key in request) {
      formData.append(key, request[key]);
    }

    if (params !== null) {
      const httpParams = this.buildParams(params);
      req = this._http.post(`${this.url}${endPoint}`, formData, {
        params: httpParams,
      });
    } else {
      req = this._http.post(`${this.url}${endPoint}`, formData);
    }

    return req;
  }


}
