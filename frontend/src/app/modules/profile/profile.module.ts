import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { ChangeNameComponent } from "./components/change-name/change-name.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";


@NgModule({
  declarations: [
    ProfileComponent,
    ChangeNameComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
