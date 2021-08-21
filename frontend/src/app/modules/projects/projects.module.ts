import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';


@NgModule({
  declarations: [ProjectsComponent, ProjectDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
