import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingParticipantModalComponent } from './existing-participant-modal.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { dbData, mockProviders } from "@shared/tests/constants";
import { HttpClient } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

describe('ExistingParticipantModalComponent', () => {
  let component: ExistingParticipantModalComponent;
  let fixture: ComponentFixture<ExistingParticipantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ExistingParticipantModalComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {
          participants: dbData.participantsShort
        }},
        {provide: HttpClient, useValue: {}},
        {provide: ToasterService, useValue: mockProviders.mockToasterService}
      ],
      imports: [
        TranslateModule.forRoot(),
        MatAutocompleteModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingParticipantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
