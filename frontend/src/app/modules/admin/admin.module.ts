import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@shared/shared.module';
import { ArchiveManagerComponent } from './components/archive-manager/archive-manager.component';
import { TranslateModule } from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangeNameComponent } from './components/change-name/change-name.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UsersComponent } from './components/users/users.component';
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [AdminComponent, ArchiveManagerComponent, ProfileComponent, ChangeNameComponent, ChangePasswordComponent, UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule
  ]
})
export class AdminModule { }
