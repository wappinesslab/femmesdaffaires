import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberSignupFormPage } from './member-signup-form.page';

const routes: Routes = [
  {
    path: '',
    component: MemberSignupFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberSignupFormPageRoutingModule {}
