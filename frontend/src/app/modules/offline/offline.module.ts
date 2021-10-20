import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineRoutingModule } from './offline-routing.module';
import { OfflineComponent } from './offline.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [OfflineComponent],
  imports: [
    CommonModule,
    OfflineRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class OfflineModule { }
