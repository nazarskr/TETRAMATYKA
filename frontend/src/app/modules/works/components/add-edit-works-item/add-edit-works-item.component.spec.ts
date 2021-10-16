import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditWorksItemComponent } from './add-edit-works-item.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { dbData, mockFile, mockProviders } from "@shared/tests/constants";
import { HttpClient } from "@angular/common/http";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { WorksService } from "../../services/works.service";

describe('AddEditWorksItemComponent', () => {
  let component: AddEditWorksItemComponent;
  let fixture: ComponentFixture<AddEditWorksItemComponent>;

  let worksServiceStub: Partial<WorksService> = {
    createWorksItem: (formData: FormData) => of(dbData.worksItem),
    updateWorksItem: (id: string, formData: FormData) => of(dbData.worksItem)
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
      declarations: [ AddEditWorksItemComponent ],
      providers: [
        {provide: MatDialogRef, useValue: mockProviders.mockDialog},
        {provide: MatDialog, useValue: mockProviders.mockDialog},
        {provide: Router, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: HttpClient, useValue: {}},
        {provide: ToasterService, useValue: mockProviders.mockToasterService},
        {provide: ActivatedRoute, useValue: mockProviders.mockRouteWithId},
        {provide: WorksService, useValue: worksServiceStub}
      ],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    fixture = await TestBed.createComponent(AddEditWorksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data and call formPatchValue if item passed to the modal', () => {
    const formPatchMethodSpy = spyOn(component, 'formPatchValue');
    component.data.item = {...dbData.worksItem};
    component.initForm();
    expect(component.worksItem).toBeTruthy();
    expect(component.imageUrl).toBe(dbData.worksItem.imageUrl);
    expect(formPatchMethodSpy).toHaveBeenCalled();
  });

  it('should patch form', () => {
    component.worksItem = {...dbData.worksItem};
    const formPatchSpy = spyOn(component.worksItemForm, 'patchValue');
    component.formPatchValue();
    expect(formPatchSpy).toHaveBeenCalledWith({
      title_UA: component.worksItem.title.ua,
      title_EN: component.worksItem.title.en,
      description_UA: component.worksItem.description.ua,
      description_EN: component.worksItem.description.en
    });
  });

  it('should return and display message if form invalid', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showErrorMessage');
    const message = 'Fill all required fields';
    component.saveWorksItem();
    expect(toasterSpy).toHaveBeenCalledWith(message);
  });

  it('should return and display message if image missed', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showErrorMessage');
    const message = 'Image is required';
    component.worksItem = {...dbData.worksItem};
    component.formPatchValue();
    component.imageUrl = null;
    component.multipartFile = null;
    component.saveWorksItem();
    expect(toasterSpy).toHaveBeenCalledWith(message);
  });

  it('should call createWorksItem', () => {
    const createWorksItemSpy = spyOn(component, 'createWorksItem');
    const worksItem = dbData.worksItem;
    component.worksItem = null;
    component.worksItemForm.patchValue({
      title_UA: worksItem.title.ua,
      title_EN: worksItem.title.en,
      description_UA: worksItem.description.ua,
      description_EN: worksItem.description.en
    });
    component.multipartFile = mockFile();
    component.saveWorksItem();
    expect(createWorksItemSpy).toHaveBeenCalled();
  });

  it('should call updateWorksItem and append multipart file if present', () => {
    const updateWorksItemSpy = spyOn(component, 'updateWorksItem');
    component.worksItem = dbData.worksItem;
    component.formPatchValue();
    component.imageUrl = 'http://someurl';
    component.multipartFile = mockFile();
    component.saveWorksItem();
    expect(updateWorksItemSpy).toHaveBeenCalled();
  });

  it('should create works item and display message', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showMessage');
    const closeModalSpy = spyOn(component, 'closeModal');
    const message = 'Works item created successfully';
    const formData = new FormData();
    component.createWorksItem(formData);
    expect(toasterSpy).toHaveBeenCalledWith(message);
    expect(closeModalSpy).toHaveBeenCalledWith(true);
  });

  it('should update works item and display message', () => {
    const toasterSpy = spyOn(component['_toaster'], 'showMessage');
    const closeModalSpy = spyOn(component, 'closeModal');
    const message = 'Works item updated successfully';
    const formData = new FormData();
    component.worksItem = {...dbData.worksItem};
    component.updateWorksItem(formData);
    expect(toasterSpy).toHaveBeenCalledWith(message);
    expect(closeModalSpy).toHaveBeenCalledWith(true);
  });

  it('should add new multipart file and create image url', () => {
    const url = 'http://someurl';
    const newFile = mockFile();
    component.imageUrl = url;
    component.multipartFile = null;
    component.changeImage(newFile);
    expect(component.imageUrl).not.toBe(url);
    expect(component.multipartFile).not.toBeNull();
  });

  it('should open dialog and call clearImage method if confirmed', () => {
    const dialogSpy = createDialogSpy(true);
    const clearImageSpy = spyOn(component, 'clearImage');
    component.openClearImageDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(clearImageSpy).toHaveBeenCalled();
  });

  it('should open dialog and don\'t call clearImage method if canceled', () => {
    const dialogSpy = createDialogSpy(false);
    const clearImageSpy = spyOn(component, 'clearImage');
    component.openClearImageDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(clearImageSpy).not.toHaveBeenCalled();
  });

  it('should clear imageUrl and multipart file', () => {
    component.imageUrl = 'http://someurl';
    component.multipartFile = mockFile();
    component.clearImage();
    expect(component.imageUrl).toBeNull();
    expect(component.multipartFile).toBeNull();
  });

  it('should close dialog', () => {
    const dialogSpy = spyOn(component.dialogRef, 'close');
    const res = true;
    component.closeModal(res);
    expect(dialogSpy).toHaveBeenCalledWith(res);
  });
});
