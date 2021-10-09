import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksComponent } from './works.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { WorksService } from "./services/works.service";
import { Observable, of } from "rxjs";
import { WorksItemShort} from "@shared/interfaces/works";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { UserPermissionDirective } from "@shared/directives/user-permission.directive";
import { dbData, mockProviders } from "@shared/tests/constants";

describe('WorksComponent', () => {
  let component: WorksComponent;
  let fixture: ComponentFixture<WorksComponent>;
  let worksServiceStub: Partial<WorksService>;
  worksServiceStub = {
    getAllWorksShort(): Observable<WorksItemShort[]> {
      return of(dbData.worksItemsShort);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ WorksComponent, UserPermissionDirective ],
      providers: [
        {provide: MatDialog, useValue: mockProviders.mockDialog},
        {provide: HttpClient, useValue: {}},
        {provide: Router, useValue: {}},
        {provide: WorksService, useValue: worksServiceStub}
      ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    const dialogSpy = spyOn(component['_dialog'], 'open').and
      .returnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof component>);
    component.addWorksItem();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should display empty state message', () => {
    component.works = [];
    fixture.detectChanges();
    const emptyStateEl = fixture.nativeElement.querySelector('.will-be-soon-message');
    expect(emptyStateEl).toBeTruthy();
  });
});
