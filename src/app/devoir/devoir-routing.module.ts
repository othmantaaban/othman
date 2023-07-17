import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevoirPage } from './devoir.page';

const routes: Routes = [
  {
    path: '',
    component: DevoirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevoirPageRoutingModule {}
