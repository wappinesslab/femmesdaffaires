import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'news',
    loadChildren: () => import('../../pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('../../pages/settings/settings.module').then( m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
