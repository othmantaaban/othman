import { Injectable } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable()
  constructor(
    private animationCtrl: AnimationController,
    private toastController: ToastController

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


  animationMethode(element: any, methode: Function,) {
    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(500)
      // .fromTo('opacity', '1', '0')
      .fromTo('height', element.offsetHeight + 'px', 'initial')
      // .fromTo('margin',  '10px', '0')
      .onFinish(() => methode())
      .easing('cubic-bezier(0.42,0.72,0,1)')
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
}
