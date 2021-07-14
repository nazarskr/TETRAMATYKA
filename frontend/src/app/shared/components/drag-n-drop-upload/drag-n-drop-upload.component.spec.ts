import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragNDropUploadComponent } from './drag-n-drop-upload.component';

describe('DragNDropUploadComponent', () => {
  let component: DragNDropUploadComponent;
  let fixture: ComponentFixture<DragNDropUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragNDropUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragNDropUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
