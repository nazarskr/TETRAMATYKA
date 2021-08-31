import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexItemDetailsViewComponent } from './complex-item-details-view.component';

describe('ComplexItemDetailsViewComponent', () => {
  let component: ComplexItemDetailsViewComponent;
  let fixture: ComponentFixture<ComplexItemDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexItemDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexItemDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
