import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/globalService/global.service';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private endPoint = "album_ens";
  constructor(private global : GlobalService) { }


  getAlbums() {
    return this.global.getHttpClient(this.endPoint);
  }

  setAlbumValid(albumId: number, action: string, value : any = null) {
    let request : Object = {};
    if(value === null) {
      request = {
        id: albumId,
        action: action
      }
    } else {
      request = {
        id: albumId,
        action: action,
        value: value
      }
    }
    return this.global.postHttpClient(this.endPoint, request);
  }

  getAlbumContent(albumId : number) {
    return this.global.getHttpClient(this.endPoint, { albumId: albumId });
  }
}
