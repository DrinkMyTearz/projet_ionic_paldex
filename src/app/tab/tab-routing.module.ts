import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }, {
        path:'home',
        loadChildren: () => import('../home/home.module').then(m=>m.HomePageModule)
      }, {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m=>m.AboutPageModule)
      }, {
        path: 'pal',
        loadChildren: () => import('../pal-list/pal-list.module').then( m => m.PalListPageModule)
      }, {
        path: 'geo',
        loadChildren: () => import('../geo/geo.module').then( m => m.GeoPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
