import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditParticipantComponent } from './add-edit-participant.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToasterService} from "@shared/services/toaster/toaster.service";
import {mockProviders} from "@shared/tests/constants";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AddEditParticipantComponent', () => {
  let component: AddEditParticipantComponent;
  let fixture: ComponentFixture<AddEditParticipantComponent>;

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
        {provide: ActivatedRoute, useValue: mockProviders.mockRouteWithId}
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
});
