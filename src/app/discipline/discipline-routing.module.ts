import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisciplinePage } from './discipline.page';

const routes: Routes = [
  {
    path: '',
    component: DisciplinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisciplinePageRoutingModule {}
