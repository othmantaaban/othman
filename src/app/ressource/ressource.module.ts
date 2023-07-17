import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourcePageRoutingModule } from './ressource-routing.module';

import { RessourcePage } from './ressource.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RessourcePageRoutingModule
  ],
  declarations: [RessourcePage]
})
export class RessourcePageModule {}
