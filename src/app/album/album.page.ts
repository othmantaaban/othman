import { ChangeDetectorRef, Component,  OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup, IonicSlides } from '@ionic/angular';
import { AlbumService } from './service/album.service';
import { NotificationService } from '../dashboard/services/notification.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  swiperModules = [IonicSlides]
  @ViewChild('albumAccordion') group : IonAccordionGroup;


  albums : Array<any> = [];
  albumContent : Object = {};

  activeIndex : number = 1
  constructor(
    private albumService : AlbumService,
    private cdr : ChangeDetectorRef,
    private notificationService : NotificationService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initialize()
  }
  initialize() {
    const data = this.albumService.getAlbums()

    data.subscribe(elt => {
      this.albums = elt
      this.cdr.detectChanges();
    })
  }

  goToNext(swiperRef : any) {
    const swiperElt =  document.querySelector(`#${swiperRef}`) as any;
    const swiper = swiperElt.swiper
    // console.log();
    // swiper.pagination = this.PaginationConfig
    // console.log(swiper.pagination);

    console.log(swiper);

    swiper.slideNext()
  }
  goToPrev(swiperRef : any) {
    const swiperElt =  document.querySelector(`#${swiperRef}`) as any;
    const swiper = swiperElt.swiper
    swiper.slidePrev()
  }


  valideAlbum($event, devoirId: number, action: string = null) {
    // $event.stopPropagation();
    const data = this.albumService.setAlbumValid(devoirId, action);
    data.subscribe((res: any) => {
      const eltRef = $event.target.closest('ion-col');
      this.notificationService.validateAnimation(eltRef, () => {
        this.initialize()
        eltRef.remove()
        this.notificationService.presentToast(res.msg, res.valide)
      })
    });
  }

  getAlbumContent() {
    const albumId = this.group.value


    if(albumId !== undefined) {
      const data =this.albumService.getAlbumContent(+albumId)
      data.subscribe(elt=> {
        this.albumContent = elt
      })
    }
  }
}
