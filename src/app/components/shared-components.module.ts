import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddAnnoucementCategoryComponent } from './add-annoucement-category/add-annoucement-category.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { DashboardFabComponent } from './dashboard-fab/dashboard-fab.component';
import { ProfilePopoverComponent } from './profile-popover/profile-popover.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeSliderTopComponent } from './home-slider-top/home-slider-top.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';



@NgModule({
  declarations: [
    AddAnnoucementCategoryComponent,
    AddAnnouncementComponent,
    DashboardFabComponent,
    ProfilePopoverComponent,
    ProfileComponent,
    HomeSliderTopComponent,
    EditAnnouncementComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DashboardFabComponent,
    EditAnnouncementComponent
  ],
  exports: [
    AddAnnoucementCategoryComponent,
    AddAnnouncementComponent,
    DashboardFabComponent,
    ProfilePopoverComponent,
    ProfileComponent,
    HomeSliderTopComponent,
    EditAnnouncementComponent
  ]
})
export class SharedComponentsModule { }
