import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'message',
        loadChildren: () => import('../message/message.module').then( m => m.MessagePageModule)
      },
      {
        path: 'devoir',
        loadChildren: () => import('../devoir/devoir.module').then( m => m.DevoirPageModule)
      },
      {
        path: 'ressource',
        loadChildren: () => import('../ressource/ressource.module').then( m => m.RessourcePageModule)
      },
      {
        path: 'album',
        loadChildren: () => import('../album/album.module').then( m => m.AlbumPageModule)
      },
      {
        path: 'demande',
        loadChildren: () => import('../demande/demande.module').then( m => m.DemandePageModule)
      },
      {
        path: 'absence',
        loadChildren: () => import('../absence/absence.module').then( m => m.AbsencePageModule)
      },
      {
        path: 'discipline',
        loadChildren: () => import('../discipline/discipline.module').then( m => m.DisciplinePageModule)
      },
      {
        path: 'evaluation',
        loadChildren: () => import('../evaluation/evaluation.module').then( m => m.EvaluationPageModule)
      },
      {
        path: '',
        redirectTo: 'message',
        pathMatch: 'full'
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
