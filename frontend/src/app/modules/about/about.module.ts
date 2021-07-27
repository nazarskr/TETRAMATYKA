import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class AboutModule { }
