import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { SharedModule } from '@shared/shared.module';
import { ProgramItemComponent } from './program-item/program-item.component';


@NgModule({
  declarations: [ProgramComponent, ProgramItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProgramRoutingModule
  ]
})
export class ProgramModule { }
