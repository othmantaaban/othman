import { Injectable } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
// import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
// import { PdfPage } from 'src/app/pdf/pdf.page';
// import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable()
  // private iab : InAppBrowser = new InAppBrowser()
  constructor(
    private animationCtrl: AnimationController,
    private toastController: ToastController,
  ) {
  }

  getNotification(notification : string) {
    this.notificationSubject.next(notification)
  }


  validateAnimation(element, method : Function) {
    console.log(element);

    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(500)
      .fromTo('opacity', '1', '0')
      .fromTo('height', element.offsetHeight + 'px', '0')
      .fromTo('min-height', "104px", '0')
      // .fromTo('display',  'block', 'none')
      .onFinish(() => method())
      .easing('cubic-bezier(0.42,0.72,0,1)')
    animation.play()
  }


  closeValidation(element: any, methode: Function,) {
    element.querySelector("ion-button").disabled = true;

    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(500)
      .fromTo('opacity', '1', '0')
      .fromTo('height', '100%', '0')
      .onFinish(() => {
        element.style.display = 'none';
        methode()
      })
      .easing('cubic-bezier(0.42,0.72,0,1)')
    animation.play()
  }

  openValidation(element: any, methode: Function,) {
    element.querySelector("ion-button").disabled = false;

    const animation = this.animationCtrl.create()
    .addElement(element)
    .duration(400)
    .fromTo('opacity', '0', '1')
    .fromTo('height', '0', '100%')
    .onFinish(() => methode())
    .easing('cubic-bezier(0.42,0.72,0,1)')
    element.style.display = 'flex';
    animation.play()
    }

  async presentToast(msg: string, isValid: boolean) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
      mode: "ios",
      cssClass: `devoirToast ${isValid ? "valide" : "nvalide"}`,
      icon: isValid ? 'checkmark-outline' : 'ban-outline',
    });
    toast.addEventListener('click', async () => {
      await toast.dismiss()
    });

    await toast.present();
  }

  async openIFrame(url: string, fileName : string) {
    // const x = new InAppBrowser()
      // console.log(this.iab.create(url, "_self"));

    //   const browser = this.iab.create('https://ionicframework.com/')
    //   browser.on('loadstop').subscribe(event => {
    //     browser.insertCSS({ code: "body{color: red;" });
    //  });
  }
}
