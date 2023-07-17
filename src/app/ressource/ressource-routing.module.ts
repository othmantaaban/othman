import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RessourcePage } from './ressource.page';

const routes: Routes = [
  {
    path: '',
    component: RessourcePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RessourcePageRoutingModule {}
