import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksDetailsComponent } from './works-details.component';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToasterService} from "@shared/services/toaster/toaster.service";
import {HttpClient} from "@angular/common/http";
import {WorksService} from "../../services/works.service";
import {of} from "rxjs";
import {ParticipantsService} from "../../../participants/services/participants/participants.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {dbData, mockProviders} from "@shared/tests/constants";
import {TranslateModule} from "@ngx-translate/core";
import {UserPermissionDirective} from "@shared/directives/user-permission.directive";
import {MatMenuModule} from "@angular/material/menu";

describe('WorksDetailsComponent', () => {
  let component: WorksDetailsComponent;
  let fixture: ComponentFixture<WorksDetailsComponent>;

  let worksServiceStub: Partial<WorksService> = {
    getWorksItemsById: () => of(dbData.worksItem)
  }

  let participantsServiceStub: Partial<ParticipantsService> = {
    getParticipantsForWorksItem: () => of(dbData.participants),
    getAllParticipantsShort: () => of(dbData.participantsShort)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ WorksDetailsComponent, UserPermissionDirective ],
      providers: [
        {provide: Router, useValue: {}},
        {provide: MatDialog, useValue: mockProviders.mockDialog},
        {provide: HttpClient, useValue: {}},
        {provide: ToasterService, useValue: mockProviders.mockToasterService},
        {provide: ActivatedRoute, useValue: mockProviders.mockRouteWithId},
        {provide: WorksService, useValue: worksServiceStub},
        {provide: ParticipantsService, useValue: participantsServiceStub},
      ],
      imports: [TranslateModule.forRoot(), MatMenuModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
