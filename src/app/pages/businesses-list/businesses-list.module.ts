import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessesListPageRoutingModule } from './businesses-list-routing.module';

import { BusinessesListPage } from './businesses-list.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { FilterPipe } from './FilterPipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    BusinessesListPageRoutingModule
  ],
  declarations: [BusinessesListPage]
})
export class BusinessesListPageModule {}
