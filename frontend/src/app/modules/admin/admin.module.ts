import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@shared/shared.module';
import { ArchiveManagerComponent } from './components/archive-manager/archive-manager.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminComponent, ArchiveManagerComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        TranslateModule,
        FormsModule
    ]
})
export class AdminModule { }
