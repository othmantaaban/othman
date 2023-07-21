import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // private url = "https://boti.education/p/demo/botiapi/admin_"
  private url = 'http://localhost/school_23/botiapi/';

  constructor(private _http: HttpClient) {}

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

  deleteHttpClient(endPoint: string, params: Object = null) {
    let req;
    if (params !== null) {
      const httpParams = this.buildParams(params);
      req = this._http.delete(`${this.url}${endPoint}`, { params: httpParams });
    } else {
      req = this._http.delete(`${this.url}${endPoint}`, { body: 'cjksdnc' });
    }
  }
}
