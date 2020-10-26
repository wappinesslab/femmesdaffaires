import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberSignupFormPageRoutingModule } from './member-signup-form-routing.module';

import { MemberSignupFormPage } from './member-signup-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MemberSignupFormPageRoutingModule
  ],
  declarations: [MemberSignupFormPage]
})
export class MemberSignupFormPageModule {}
