import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessesListPageRoutingModule } from './businesses-list-routing.module';

import { BusinessesListPage } from './businesses-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessesListPageRoutingModule
  ],
  declarations: [BusinessesListPage]
})
export class BusinessesListPageModule {}
