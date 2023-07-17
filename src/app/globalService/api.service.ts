import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { apiUrl } from 'src/environments/environment';
// import { isObject } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl = "https://boti.education/p/demo/botiapi/"

  static loaderHtml: string = `
  <div class="custom-spinner-container">
    <div class="custom-spinner-box">
    <img src="assets/imgs/loading/three-dots.svg" />
    </div>
  </div>`;



  constructor(
    private http: HttpClient,
  ) { }

  get(params: any, url: String): Observable<any> {
    const type = 'application/x-www-form-urlencoded; charset=UTF-8';

    const optionRequete = {
      params,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({
        'Content-Type': type
      })
    };

    return this.http
      .get(this.apiUrl + url, optionRequete);
  }

  post(params: any, url: String): Observable<any> {
    const data = new FormData();
    Object.entries(params).forEach(([key, value], index) => {
      if(typeof value == 'object' && value != null){
        try {
          if(Array.isArray(value)){
            for (let index = 0; index < value.length; index++) {
              const element = value[index];
              data.append(key, element)
            }
          }else{
            // @ts-ignore: Unreachable code error
            data.append(key, (value.file) as Blob,value.name);
          }

        } catch (error) {
          console.log(key)
          console.log(error)
        }
      }else
      data.append(key, value as any);
    });
    return this.http
      .post(this.apiUrl + url, data);
  }


  getBlob(url: string, params: any ,isAbsolute = false): Observable<any> {
    return this.http.get(
      (!isAbsolute ? this.apiUrl : '') + url,
      {
        params,
        responseType: 'blob'
      }
      );
  }

}
