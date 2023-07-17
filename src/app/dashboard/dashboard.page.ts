import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

import { DashboardService } from './services/dashboard.service';
import { NotificationService } from './services/notification.service';
import { all } from 'axios';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  notification : Object = {
    devoir : 0,
    evaluation : 0,
    discipline : 0,
    ressource : 0,
    message : 0,
    demande : 0,
    album : 0,
    absence : 0,
  }
  currentSlideIndex = 0;

  swiperInjStyle = [
    `
    .swiper-pagination-bullet {
      transition: .7s;
    }

    .swiper-pagination-bullet-active {
      width: 26px;
      border-radius: 25px;
    }
    `,
  ];

  ionViewWillEnter() {
    this.onchange()
  }

  onchange() {
    console.log("dashboard");
  }


  swiperModules = [IonicSlides]
  constructor(
    private DashService : DashboardService,
    private notificationService : NotificationService,
    ) { }




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
