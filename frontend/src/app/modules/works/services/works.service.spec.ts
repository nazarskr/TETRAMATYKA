import { TestBed } from '@angular/core/testing';

import { WorksService } from './works.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('WorksService', () => {
  let service: WorksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WorksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
