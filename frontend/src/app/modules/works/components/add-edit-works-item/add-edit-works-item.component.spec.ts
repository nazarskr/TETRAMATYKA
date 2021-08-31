import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorksItemComponent } from './add-edit-works-item.component';

describe('AddEditWorksItemComponent', () => {
  let component: AddEditWorksItemComponent;
  let fixture: ComponentFixture<AddEditWorksItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWorksItemComponent ]
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
