import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { SharedModule } from '@shared/shared.module';
import { ProgramDetailsComponent } from './program-details/program-details.component';


@NgModule({
  declarations: [ProgramComponent, ProgramDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProgramRoutingModule
  ]
})
export class ProgramModule { }
