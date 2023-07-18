import { ChangeDetectorRef, Component,  OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup, IonButton, IonIcon, IonicSlides } from '@ionic/angular';
import { AlbumService } from './service/album.service';
import { NotificationService } from '../dashboard/services/notification.service';
import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/element';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  swiperModules = [IonicSlides]
  @ViewChild('albumAccordion') group : IonAccordionGroup;
  PaginationConfig = {
    type: 'custom',
    renderCustom: (swiper: any, current: any, total: any) => {
      const swiperParent = swiper.el.previousElementSibling;

      swiperParent.innerHTML =  `
        <ion-img src='assets/imageIcon.svg'></ion-img>
        <span>
          <span style='font-weight: bold;'>${current}/</span>
          <span >${total}</span>
        </span>
      ` ;
      return null
    },
  };


  albums : Array<any> = [];
  albumContent : Object = {};

  activeIndex : number = 1
  constructor(
    private albumService : AlbumService,
    private cdr : ChangeDetectorRef,
    private notificationService : NotificationService,
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
    const data = this.albumService.setAlbumValid(devoirId, action, "validation");
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
    const swiperElt =  document.querySelector(`#swiper${albumId}`) as any;

    
    
    if(albumId !== undefined) {
      const data =this.albumService.getAlbumContent(+albumId)
      
      data.subscribe(elt=> {
        const swiper = swiperElt.swiper as Swiper
        const swperSlideElt = (pic) => {
          const swiperSlide = document.createElement("swiper-slide") as SwiperSlide
          swiperSlide.className = "album"
          const IonBtn = document.createElement("ion-button") as HTMLIonButtonElement;
          IonBtn.addEventListener("click", () => this.removePic(albumId));
          IonBtn.className = "remove"
          IonBtn.shape = "round"
          const IonIcon = document.createElement("ion-icon") as HTMLIonIconElement
          IonIcon.name = "trash-outline"
          // "<ion-icon name='trash-outline'></ion-icon>"
          IonBtn.appendChild(IonIcon)
          const ionImg = document.createElement("ion-img") as HTMLIonImgElement
          ionImg.src = pic
          swiperSlide.appendChild(ionImg)
          swiperSlide.appendChild(IonBtn)
    
          return swiperSlide
        }
        swiper.removeAllSlides()
        if(elt.images) {
          elt.images.map((pic, i) => {
            swiper.addSlide(i + 1, swperSlideElt(pic))
          })
          
        }
        this.albumContent = elt
       })
    }
  }

  removePic(devoirId) {
    const data = this.albumService.setAlbumValid(devoirId, "deletePic");
    data.subscribe(res => {
      // this.notificationService.validateAnimation(eltRef, () => {
        // this.initialize()
        this.notificationService.presentToast(res.msg, res.valide)
      // })
    })
  }
}
