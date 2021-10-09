import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@shared/shared.module';
import { ArchiveManagerComponent } from './components/archive-manager/archive-manager.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    AdminComponent,
    ArchiveManagerComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
