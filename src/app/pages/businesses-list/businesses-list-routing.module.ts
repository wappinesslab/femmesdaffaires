import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessesListPage } from './businesses-list.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessesListPageRoutingModule {}
