import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';
import { WorksComponent } from './works.component';
import { WorksDetailsComponent } from './components/works-details/works-details.component';

const routes: Routes = [
  {path: '', component: WorksComponent},
  {path: 'create', component: WorksDetailsComponent, canActivate: [AdminGuard]},
  {path: ':id', component: WorksDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksRoutingModule { }
