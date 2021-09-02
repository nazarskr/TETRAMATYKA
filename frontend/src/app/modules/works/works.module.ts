import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksRoutingModule } from './works-routing.module';
import { WorksComponent } from './works.component';
import { WorksDetailsComponent } from './components/works-details/works-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { AddEditParticipantComponent } from './components/add-edit-participant/add-edit-participant.component';
import { AddEditWorksItemComponent } from './components/add-edit-works-item/add-edit-works-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExistingParticipantModalComponent } from './components/existing-participant-modal/existing-participant-modal.component';


@NgModule({
  declarations: [
    WorksComponent,
    WorksDetailsComponent,
    AddEditParticipantComponent,
    AddEditWorksItemComponent,
    ExistingParticipantModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    WorksRoutingModule,
    SharedModule
  ]
})
export class WorksModule { }
