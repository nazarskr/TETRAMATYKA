import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantsComponent } from './participants.component';
import { ParticipantDetailsComponent } from './components/participant-details/participant-details.component';
import { AdminGuard } from '@core/guards/admin.guard';

const routes: Routes = [
  {path: '', component: ParticipantsComponent},
  {path: 'new', component: ParticipantDetailsComponent, canActivate: [AdminGuard]},
  {path: ':id', component: ParticipantDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantsRoutingModule { }
