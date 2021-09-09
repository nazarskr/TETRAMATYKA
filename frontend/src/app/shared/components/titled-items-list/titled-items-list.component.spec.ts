import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitledItemsListComponent } from './titled-items-list.component';

describe('TitledItemsListComponent', () => {
  let component: TitledItemsListComponent;
  let fixture: ComponentFixture<TitledItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitledItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitledItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
