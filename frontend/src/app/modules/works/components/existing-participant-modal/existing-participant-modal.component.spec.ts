import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingParticipantModalComponent } from './existing-participant-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
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
  const mockParticipant = {_id: 'someid', fullName: {en: 'en', ua: 'ua'}};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ExistingParticipantModalComponent ],
      providers: [
        {provide: MatDialogRef, useValue: mockProviders.mockDialog},
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
    fixture = await TestBed.createComponent(ExistingParticipantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not close modal and show message if participant not selected', () => {
    const dialogSpy = spyOn(component.dialogRef, 'close');
    const toasterSpy = spyOn(component['_toaster'], 'showErrorMessage');
    const message = 'Select participant or cancel';
    component.selectedParticipant = undefined;
    component.saveSelectedParticipant();
    expect(toasterSpy).toHaveBeenCalledWith(message);
    expect(dialogSpy).not.toHaveBeenCalled();
  });

  it('should close dialog and don\'t show error message if participant selected', () => {
    const dialogSpy = spyOn(component.dialogRef, 'close');
    const toasterSpy = spyOn(component['_toaster'], 'showErrorMessage');
    component.selectedParticipant = JSON.parse(JSON.stringify(mockParticipant));
    component.saveSelectedParticipant();
    expect(toasterSpy).not.toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should select participant and set translated full name to the autocomplete input', () => {
    const selectedParticipant = JSON.parse(JSON.stringify(mockParticipant));
    component.participantControl.setValue(selectedParticipant);
    component.selectParticipant();
    expect(component.selectedParticipant._id).toBe(selectedParticipant._id);
    expect(component.participantControl.value).toBe(selectedParticipant.fullName[component.lang]);
  });
});
