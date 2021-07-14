import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActionButtonComponent } from './table-action-button.component';

describe('TableActionButtonComponent', () => {
  let component: TableActionButtonComponent;
  let fixture: ComponentFixture<TableActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableActionButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
