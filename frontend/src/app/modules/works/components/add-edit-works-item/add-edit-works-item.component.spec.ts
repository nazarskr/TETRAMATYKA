import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorksItemComponent } from './add-edit-works-item.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {mockProviders} from "@shared/tests/constants";
import {HttpClient} from "@angular/common/http";
import {ToasterService} from "@shared/services/toaster/toaster.service";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AddEditWorksItemComponent', () => {
  let component: AddEditWorksItemComponent;
  let fixture: ComponentFixture<AddEditWorksItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ AddEditWorksItemComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MatDialog, useValue: {}},
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWorksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
