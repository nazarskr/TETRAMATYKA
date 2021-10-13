import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksDetailsComponent } from './works-details.component';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { HttpClient } from "@angular/common/http";
import { WorksService } from "../../services/works.service";
import { of } from "rxjs";
import { ParticipantsService } from "../../../participants/services/participants/participants.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { dbData, mockProviders } from "@shared/tests/constants";
import { TranslateModule } from "@ngx-translate/core";
import { UserPermissionDirective } from "@shared/directives/user-permission.directive";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {AddEditWorksItemComponent} from "../add-edit-works-item/add-edit-works-item.component";

fdescribe('WorksDetailsComponent', () => {
  let component: WorksDetailsComponent;
  let fixture: ComponentFixture<WorksDetailsComponent>;

  let worksServiceStub: Partial<WorksService> = {
    getWorksItemsById: () => of(dbData.worksItem)
  }

  let participantsServiceStub: Partial<ParticipantsService> = {
    getParticipantsForWorksItem: () => of(dbData.participants),
    getAllParticipantsShort: () => of(dbData.participantsShort)
  }

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ WorksDetailsComponent, UserPermissionDirective ],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: MatDialog, useValue: mockProviders.mockDialog},
        {provide: HttpClient, useValue: {}},
        {provide: ToasterService, useValue: mockProviders.mockToasterService},
        {provide: ActivatedRoute, useValue: mockProviders.mockRouteWithId},
        {provide: WorksService, useValue: worksServiceStub},
        {provide: ParticipantsService, useValue: participantsServiceStub},
      ],
      imports: [
        TranslateModule.forRoot(),
        MatMenuModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
    fixture = await TestBed.createComponent(WorksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open Add participant dialog', () => {
    const dialogSpy = spyOn(component['_dialog'], 'open').and
      .returnValue({
        afterClosed: () => of(false)
      } as MatDialogRef<typeof component>);
    component.addParticipant();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call goBack method', () => {
    const goBackSpy = spyOn(component, 'goToWorksList');
    const backButton = fixture.nativeElement.querySelector('.back-button');
    backButton.click();
    expect(goBackSpy).toHaveBeenCalled();
  });

  it('should navigate back', () => {
    component.goToWorksList();
    expect (mockRouter.navigate).toHaveBeenCalledWith (['/works']);
  });

  it('add participant menu should be closed by default', () => {
    const menu = fixture.nativeElement.parentNode.querySelector('.mat-menu-panel');
    expect(menu).toBeFalsy();
  });

  it('should open add participant menu', () => {
    const button = fixture.nativeElement.querySelector('.mat-menu-trigger');
    button.click();
    const menu = fixture.nativeElement.parentNode.querySelector('.mat-menu-panel');
    expect(menu).toBeTruthy();
  });

  it('should open existing participants dialog if there is available participants', () => {
    component.participantsShort = JSON.parse(JSON.stringify(dbData.participants));
    const openExistingParticipantDialogSpy = spyOn(component, 'openSelectParticipantDialog');
    component.selectParticipantFromList();
    expect(openExistingParticipantDialogSpy).toHaveBeenCalled();
  });

  it('should show warning message if there is not available participants', () => {
    component.participantsShort = [];
    const openExistingParticipantDialogSpy = spyOn(component, 'openSelectParticipantDialog');
    const toasterSpy = spyOn(component['_toaster'], 'showWarningMessage');
    const message = 'You have no participants to add';
    component.selectParticipantFromList();
    expect(openExistingParticipantDialogSpy).not.toHaveBeenCalled();
    expect(toasterSpy).toHaveBeenCalledWith(message);
  });

  it('should open select participant dialog', () => {
    const dialogSpy = spyOn(component['_dialog'], 'open').and
      .returnValue({
        afterClosed: () => of(false)
      } as MatDialogRef<typeof component>);
    component.openSelectParticipantDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should run openEditItemDialog and open dialog', () => {
    const openEditItemSpy = spyOn(component, 'openEditItemDialog');
    const title = 'Edit works item';
    component.editWorksItem();
    expect(openEditItemSpy).toHaveBeenCalledWith(title, component.worksItem, AddEditWorksItemComponent);
  });
});
