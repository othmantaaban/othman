import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagePageRoutingModule } from './message-routing.module';

import { MessagePage } from './message.page';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagePageRoutingModule
  ],
  declarations: [MessagePage],
  providers:[
    ImagePicker
  ]
})
export class MessagePageModule {}
