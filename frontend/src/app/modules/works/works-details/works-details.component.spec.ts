import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksDetailsComponent } from './works-details.component';

describe('WorksDetailsComponent', () => {
  let component: WorksDetailsComponent;
  let fixture: ComponentFixture<WorksDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
