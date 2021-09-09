import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsSecondaryComponent } from './item-details-secondary.component';

describe('ItemDetailsSecondaryComponent', () => {
  let component: ItemDetailsSecondaryComponent;
  let fixture: ComponentFixture<ItemDetailsSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailsSecondaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
