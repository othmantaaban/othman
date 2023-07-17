import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisciplinePageRoutingModule } from './discipline-routing.module';

import { DisciplinePage } from './discipline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisciplinePageRoutingModule
  ],
  declarations: [DisciplinePage]
})
export class DisciplinePageModule {}
