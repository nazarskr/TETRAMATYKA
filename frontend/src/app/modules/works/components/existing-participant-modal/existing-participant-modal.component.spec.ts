import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingParticipantModalComponent } from './existing-participant-modal.component';

describe('ExistingParticipantModalComponent', () => {
  let component: ExistingParticipantModalComponent;
  let fixture: ComponentFixture<ExistingParticipantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingParticipantModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingParticipantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
