import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksDetailsComponent } from './works-details.component';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { HttpClient } from "@angular/common/http";
import { WorksService } from "../../services/works.service";
import { of } from "rxjs";
import { ParticipantsService } from "../../../participants/services/participants.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { dbData, mockProviders } from "@shared/tests/constants";
import { TranslateModule } from "@ngx-translate/core";
import { UserPermissionDirective } from "@shared/directives/user-permission.directive";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddEditWorksItemComponent } from "../add-edit-works-item/add-edit-works-item.component";
import { AddEditParticipantComponent } from "../add-edit-participant/add-edit-participant.component";
import { DialogData } from "@shared/interfaces/dialog";
import { SimpleDialogComponent } from "@shared/components/simple-dialog/simple-dialog.component";
import { WorksItemParticipants } from "@shared/interfaces/works";

describe('WorksDetailsComponent', () => {
  let component: WorksDetailsComponent;
  let fixture: ComponentFixture<WorksDetailsComponent>;

  let worksServiceStub: Partial<WorksService> = {
    getWorksItemsById: () => of(dbData.worksItem),
    deleteWorksItem: (id: string) => of(dbData.worksItem),
    updateWorksItemParticipants: (id: string, participantId: string, worksItemParticipants: WorksItemParticipants) => of(dbData.worksItem)
  }

  let participantsServiceStub: Partial<ParticipantsService> = {
    getParticipantsForWorksItem: () => of(dbData.participants),
    getAllParticipantsShort: () => of(dbData.participantsShort),
    deleteParticipant: (id: string) => of(dbData.participants[0]),
  }

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  const createDialogSpy = (res: boolean | string) => {
    return spyOn(component['_dialog'], 'open').and
      .returnValue({
        afterClosed: () => of(res)
      } as MatDialogRef<typeof component>);
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

  it('should open Add participant dialog and don\'t call getWorksItem method if modal just closed', () => {
    const dialogSpy = createDialogSpy(false);
    const getWorksItemSpy = spyOn(component, 'getWorksItemById');
    component.addParticipant();
    expect(dialogSpy).toHaveBeenCalled();
    expect(getWorksItemSpy).not.toHaveBeenCalled();
  });

  it('should open Add participant dialog and call getWorksItem method', () => {
    const dialogSpy = createDialogSpy(true);
    const getWorksItemSpy = spyOn(component, 'getWorksItemById');
    component.addParticipant();
    expect(dialogSpy).toHaveBeenCalled();
    expect(getWorksItemSpy).toHaveBeenCalled();
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
    const dialogSpy = createDialogSpy('someid');
    component.openSelectParticipantDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should run openEditItemDialog with args', () => {
    const openEditItemSpy = spyOn(component, 'openEditItemDialog');
    const title = 'Edit works item';
    component.editWorksItem();
    expect(openEditItemSpy).toHaveBeenCalledWith(title, component.worksItem, AddEditWorksItemComponent);
  });

  it('should run openEditItemDialog with args', () => {
    const openEditItemSpy = spyOn(component, 'openEditItemDialog');
    const title = 'Edit participant';
    const participant = JSON.parse(JSON.stringify(dbData.participants[0]));
    component.editParticipant(participant);
    expect(openEditItemSpy).toHaveBeenCalledWith(title, participant, AddEditParticipantComponent);
  });

  it('should open Delete works item dialog and cancel deletion if dialog just closed', () => {
    const dialogSpy = createDialogSpy(false);
    const deleteItemSpy = spyOn(component, 'deleteWorksItem');
    component.openDeleteWorksItemDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(deleteItemSpy).not.toHaveBeenCalled();
  });

  it('should open Delete works item dialog and run deleteWorksItem after confirm', () => {
    const dialogSpy = createDialogSpy(true);
    const deleteItemSpy = spyOn(component, 'deleteWorksItem');
    component.openDeleteWorksItemDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(deleteItemSpy).toHaveBeenCalled();
  });

  it('should display message after successful works item deletion', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showMessage');
    const message = 'Works item deleted successfully';
    component.deleteWorksItem();
    expect(toasterSpy).toHaveBeenCalledWith(message);
  });

  it('should open Delete participant item dialog and cancel deletion if dialog just closed', () => {
    const dialogSpy = createDialogSpy(false);
    const deleteParticipantSpy = spyOn(component, 'deleteParticipant');
    const participant = JSON.parse(JSON.stringify(dbData.participants[0]));
    component.openDeleteParticipantDialog(participant);
    expect(dialogSpy).toHaveBeenCalled();
    expect(deleteParticipantSpy).not.toHaveBeenCalled();
  });

  it('should open Delete participant item dialog and call deleteParticipant method after confirm', () => {
    const dialogSpy = createDialogSpy(true);
    const deleteParticipantSpy = spyOn(component, 'deleteParticipant');
    const participant = JSON.parse(JSON.stringify(dbData.participants[0]));
    component.openDeleteParticipantDialog(participant);
    expect(dialogSpy).toHaveBeenCalled();
    expect(deleteParticipantSpy).toHaveBeenCalled();
  });

  it('should display message and getWorksItem after successful participant deletion', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showMessage');
    const getWorksItemSpy = spyOn(component, 'getWorksItemById');
    const message = 'Participant deleted successfully';
    component.deleteParticipant('someid');
    expect(toasterSpy).toHaveBeenCalledWith(message);
    expect(getWorksItemSpy).toHaveBeenCalled();
  });

  it('should add checkbox message for dialog', () => {
    const dialogSpy = createDialogSpy(false);
    const data: DialogData = {
      title: 'Delete participant',
      message: 'Are you sure you want to delete this participant?',
      checkboxText: 'For all works items'
    };
    const participant = JSON.parse(JSON.stringify(dbData.participants[0]));
    participant.works.push('secondid');
    component.openDeleteParticipantDialog(participant);
    expect(dialogSpy).toHaveBeenCalledWith(SimpleDialogComponent, {data});
  });

  it('should open dialog and don\'t call getWorksItem if dialog just closed', () => {
    const dialogSpy = createDialogSpy(false);
    const getWorksItemSpy = spyOn(component, 'getWorksItemById');
    const title = 'Edit works item';
    component.openEditItemDialog(title, component.worksItem, AddEditWorksItemComponent);
    expect(dialogSpy).toHaveBeenCalled();
    expect(getWorksItemSpy).not.toHaveBeenCalled();
  });

  it('should open dialog and call getWorksItem if dialog confirmed', () => {
    const dialogSpy = createDialogSpy(true);
    const getWorksItemSpy = spyOn(component, 'getWorksItemById');
    const title = 'Edit works item';
    component.openEditItemDialog(title, component.worksItem, AddEditWorksItemComponent);
    expect(dialogSpy).toHaveBeenCalled();
    expect(getWorksItemSpy).toHaveBeenCalled();
  });
});
