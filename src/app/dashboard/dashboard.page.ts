import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonicSlides } from '@ionic/angular';

import { DashboardService } from './services/dashboard.service';
import { NotificationService } from './services/notification.service';
import Swiper from 'swiper';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('swiperContainer', { static: true }) swiperContainer: ElementRef;
  @ViewChild('notificationIcon', { static: true }) notificationIcon: ElementRef;
  notification: Object = {
    devoir: 0,
    evaluation: 0,
    discipline: 0,
    ressource: 0,
    message: 0,
    demande: 0,
    album: 0,
    absence: 0,
  }
  currentSlideIndex = 0;

  constructor(
    private DashService: DashboardService,
    private notificationService: NotificationService,
    private animationCtrl: AnimationController
  ) { }


  ionViewWillEnter() {
    this.onchange()
    setTimeout(() => this.startIntroAnimation(this.swiperContainer.nativeElement.swiper), 1000);
    setTimeout(() => {
      console.log(this.notificationIcon.nativeElement);
      let elt = document.getElementById("helloTest")
      const animation = this.animationCtrl.create()
        .addElement(elt)
        .duration(4000)
        .delay(1000)
        .easing("cubic-bezier(.36,.07,.19,.97)")
        .iterations(Infinity);

      console.log(animation);

      animation.keyframes([
        { transform: 'translate3d(-1px, 0, 0)', offset: 0.1 },
        { transform: 'translate3d(2px, 0, 0)', offset: 0.2 },
        { transform: 'translate3d(-4px, 0, 0)', offset: 0.3 },
        { transform: 'translate3d(4px, 0, 0)', offset: 0.4 },
        { transform: 'translate3d(-4px, 0, 0)', offset: 0.5 },
        { transform: 'translate3d(4px, 0, 0)', offset: 0.6 },
        { transform: 'translate3d(-4px, 0, 0)', offset: 0.7 },
        { transform: 'translate3d(2px, 0, 0)', offset: 0.8 },
        { transform: 'translate3d(-1px, 0, 0)', offset: 0.9 },
      ]);


      animation.play();
    }, 1000)
  }

  startIntroAnimation(swiper: Swiper): void {
    // Slide to the end of the carousel slowly
    swiper.allowTouchMove = false;

    swiper.slideTo(swiper.slides.length - 1, 2000, false);


    setTimeout(() => {

      swiper.slideTo(0, 500);
      swiper.allowTouchMove = true;


      // console.log(swiper.activeIndex);
    }, 2500);
  }
  onchange() {
    console.log("dashboard");
  }


  slidechange() {
    console.log(this.swiperContainer.nativeElement.swiper);

  }

  swiperModules = [IonicSlides]





  ngOnInit() {
    this.notificationService.notification$.subscribe(notification => {
      let all = JSON.parse(notification)
      let key = Object.keys(all)[0]
      let val = all[key]
      this.notification[key] = val
      // Perform any desired actions in the parent component
    });
  }


  parentFunction() {
    console.log('Parent function executed!');
    // Perform any desired actions in the parent component
  }

}
