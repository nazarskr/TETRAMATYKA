import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantsRoutingModule } from './participants-routing.module';
import { ParticipantsComponent } from './participants.component';
import { ParticipantDetailsComponent } from './components/participant-details/participant-details.component';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ParticipantsComponent, ParticipantDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ParticipantsRoutingModule
  ]
})
export class ParticipantsModule { }
