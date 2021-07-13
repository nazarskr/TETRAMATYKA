import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveManagerComponent } from './archive-manager.component';

describe('ArchiveManagerComponent', () => {
  let component: ArchiveManagerComponent;
  let fixture: ComponentFixture<ArchiveManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
