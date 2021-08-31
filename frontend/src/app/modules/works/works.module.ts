import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksRoutingModule } from './works-routing.module';
import { WorksComponent } from './works.component';
import { WorksDetailsComponent } from './components/works-details/works-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [WorksComponent, WorksDetailsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    WorksRoutingModule,
    SharedModule
  ]
})
export class WorksModule { }
