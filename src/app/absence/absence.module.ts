import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbsencePageRoutingModule } from './absence-routing.module';

import { AbsencePage } from './absence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbsencePageRoutingModule
  ],
  declarations: [AbsencePage]
})
export class AbsencePageModule {}
