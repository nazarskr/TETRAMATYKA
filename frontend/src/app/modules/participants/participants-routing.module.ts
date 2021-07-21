import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantsComponent } from './participants.component';
import {ParticipantDetailsComponent} from './components/participant-details/participant-details.component';

const routes: Routes = [
  {path: '', component: ParticipantsComponent},
  {path: ':id', component: ParticipantDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantsRoutingModule { }
