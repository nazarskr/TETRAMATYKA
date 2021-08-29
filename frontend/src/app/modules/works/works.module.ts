import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksRoutingModule } from './works-routing.module';
import { WorksComponent } from './works.component';
import { WorksDetailsComponent } from './works-details/works-details.component';


@NgModule({
  declarations: [WorksComponent, WorksDetailsComponent],
  imports: [
    CommonModule,
    WorksRoutingModule
  ]
})
export class WorksModule { }
