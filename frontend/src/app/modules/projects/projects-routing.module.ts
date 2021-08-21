import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { AdminGuard } from "@core/guards/admin.guard";

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'create', component: ProjectDetailsComponent, canActivate: [AdminGuard]},
  {path: ':id', component: ProjectDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
