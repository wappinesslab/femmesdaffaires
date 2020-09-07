import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddAnnoucementCategoryComponent } from './add-annoucement-category/add-annoucement-category.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { DashboardFabComponent } from './dashboard-fab/dashboard-fab.component';
import { ProfilePopoverComponent } from './profile-popover/profile-popover.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddAnnoucementCategoryComponent,
    AddAnnouncementComponent,
    DashboardFabComponent,
    ProfilePopoverComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DashboardFabComponent
  ],
  exports: [
    AddAnnoucementCategoryComponent,
    AddAnnouncementComponent,
    DashboardFabComponent,
    ProfilePopoverComponent,
    ProfileComponent
  ]
})
export class SharedComponentsModule { }
