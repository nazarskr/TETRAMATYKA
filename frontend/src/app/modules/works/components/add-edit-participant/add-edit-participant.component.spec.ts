import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditParticipantComponent } from './add-edit-participant.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { dbData, mockProviders } from "@shared/tests/constants";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ParticipantsService } from "../../../participants/services/participants/participants.service";
import { of } from "rxjs";

fdescribe('AddEditParticipantComponent', () => {
  let component: AddEditParticipantComponent;
  let fixture: ComponentFixture<AddEditParticipantComponent>;

  let participantsServiceStub: Partial<ParticipantsService> = {
    createParticipant: (formData: FormData) => of(dbData.participants[0]),
    updateParticipant: (id: string, formData: FormData) => of(dbData.participants[0])
  }

  const createDialogSpy = (res: boolean) => {
    return spyOn(component['_dialog'], 'open').and
      .returnValue({
        afterClosed: () => of(res)
      } as MatDialogRef<typeof component>);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ AddEditParticipantComponent ],
      providers: [
        {provide: MatDialogRef, useValue: mockProviders.mockDialog},
        {provide: MatDialog, useValue: mockProviders.mockDialog},
        {provide: Router, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: HttpClient, useValue: {}},
        {provide: ToasterService, useValue: mockProviders.mockToasterService},
        {provide: ActivatedRoute, useValue: mockProviders.mockRouteWithId},
        {provide: ParticipantsService, useValue: participantsServiceStub}
      ],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    fixture = await TestBed.createComponent(AddEditParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set participant, imageUrl and call formPatchValue if item passed to the modal', () => {
    const formPatchMethodSpy = spyOn(component, 'formPatchValue');
    component.data.item = {...dbData.participants[0]};
    component.initForm();
    expect(component.participant).toBeTruthy();
    expect(component.imageUrl).toBe(dbData.participants[0].imageUrl);
    expect(formPatchMethodSpy).toHaveBeenCalled();
  });

  it('should patch form', () => {
    component.participant = {...dbData.participants[0]};
    const formPatchSpy = spyOn(component.participantForm, 'patchValue');
    component.formPatchValue();
    expect(formPatchSpy).toHaveBeenCalledWith({
      fullName_UA: component.participant.fullName.ua,
      fullName_EN: component.participant.fullName.en,
      bio_UA: component.participant.bio.ua,
      bio_EN: component.participant.bio.en
    });
  });

  it('should return and display message if form invalid', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showErrorMessage');
    const message = 'Fill all required fields';
    component.saveParticipant();
    expect(toasterSpy).toHaveBeenCalledWith(message);
  });

  it('should return and display message if image missed', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showErrorMessage');
    const message = 'Image is required';
    component.participant = {...dbData.participants[0]};
    component.formPatchValue();
    component.imageUrl = null;
    component.multipartFile = null;
    component.saveParticipant();
    expect(toasterSpy).toHaveBeenCalledWith(message);
  });

  it('should call createParticipant', () => {
    const createParticipantSpy = spyOn(component, 'createParticipant');
    const participant = dbData.participants[0];
    component.participant = null;
    component.participantForm.patchValue({
      fullName_UA: participant.fullName.ua,
      fullName_EN: participant.fullName.en,
      bio_UA: participant.bio.ua,
      bio_EN: participant.bio.en
    });
    component.imageUrl = 'http://someurl';
    component.saveParticipant();
    expect(createParticipantSpy).toHaveBeenCalled();
  });

  it('should call updateParticipant and append multipart file if present', () => {
    const updateParticipantSpy = spyOn(component, 'updateParticipant');
    component.participant = JSON.parse(JSON.stringify(dbData.participants[0]));
    component.formPatchValue();
    component.imageUrl = 'http://someurl';
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.pdf'));
    component.multipartFile = dataTransfer.files[0];
    component.saveParticipant();
    expect(updateParticipantSpy).toHaveBeenCalled();
  });

  it('should create participant and display message', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showMessage');
    const closeModalSpy = spyOn(component, 'closeModal');
    const message = 'Participant created successfully';
    const formData = new FormData();
    component.createParticipant(formData);
    expect(toasterSpy).toHaveBeenCalledWith(message);
    expect(closeModalSpy).toHaveBeenCalledWith(true);
  });

  it('should update participant and display message', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showMessage');
    const closeModalSpy = spyOn(component, 'closeModal');
    const message = 'Participant updated successfully';
    const formData = new FormData();
    component.participant = {...dbData.participants[0]};
    component.updateParticipant(formData);
    expect(toasterSpy).toHaveBeenCalledWith(message);
    expect(closeModalSpy).toHaveBeenCalledWith(true);
  });

  it('should change imageUrl and multipartFile', () => {
    const dataTransfer = new DataTransfer()
    const newFile = dataTransfer.items.add(new File([''], 'test-file.pdf'));
    const url = 'http://someurl';
    component.imageUrl = url;
    component.multipartFile = null;
    component.changeImage(newFile);
    expect(component.imageUrl).not.toBe(url);
    expect(component.multipartFile).not.toBeNull();
  });

  it('should open clear image dialog and call clearImage method if confirmed', () => {
    const dialogSpy = createDialogSpy(true);
    const clearImageSpy = spyOn(component, 'clearImage');
    component.openClearImageDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(clearImageSpy).toHaveBeenCalled();
  });

  it('should open clear image dialog and don\'t call clearImage method if canceled', () => {
    const dialogSpy = createDialogSpy(false);
    const clearImageSpy = spyOn(component, 'clearImage');
    component.openClearImageDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(clearImageSpy).not.toHaveBeenCalled();
  });

  it('should clear image', () => {
    component.imageUrl = 'http://someurl';
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.pdf'));
    component.multipartFile = dataTransfer.files[0];
    component.clearImage();
    expect(component.imageUrl).toBeNull();
    expect(component.multipartFile).toBeNull();
  });

  it('should close dialog image', () => {
    const dialogSpy = spyOn(component.dialogRef, 'close');
    const res = true;
    component.closeModal(res);
    expect(dialogSpy).toHaveBeenCalledWith(res);
  });
});
