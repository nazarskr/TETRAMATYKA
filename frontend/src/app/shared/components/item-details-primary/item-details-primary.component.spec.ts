import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsPrimaryComponent } from './item-details-primary.component';

describe('ItemDetailsPrimaryComponent', () => {
  let component: ItemDetailsPrimaryComponent;
  let fixture: ComponentFixture<ItemDetailsPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailsPrimaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
