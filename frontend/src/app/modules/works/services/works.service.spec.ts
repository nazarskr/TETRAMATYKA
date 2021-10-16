import { TestBed } from '@angular/core/testing';

import { WorksService } from './works.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import {dbData} from "@shared/tests/constants";

describe('WorksService', () => {
  let service: WorksService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WorksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send GET and return an Observable<WorksItem[]>', () => {
    service.getAllWorks().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res).toEqual([dbData.worksItem]);
    });

    const req = httpMock.expectOne(service.worksUri);
    expect(req.request.method).toBe("GET");
    req.flush([dbData.worksItem]);
  });

  it('should send GET return an Observable<WorksItemShort[]>', () => {
    service.getAllWorksShort().subscribe(res => {
      expect(res.length).toBe(4);
      expect(res).toEqual(dbData.worksItemsShort);
    });

    const req = httpMock.expectOne(`${service.worksUri}/short`);
    expect(req.request.method).toBe("GET");
    req.flush(dbData.worksItemsShort);
  });

  it('should send GET and return Observable<WorksItem[]>', () => {
    const childrenIds = ['someid'];

    service.getWorksForParticipant(childrenIds).subscribe(res => {
      expect(res).toEqual([dbData.worksItem]);
    });

    const req = httpMock.expectOne(`${service.worksUri}/participant?childrenIds=someid`);
    expect(req.request.method).toBe("GET");
    req.flush([dbData.worksItem]);
  });

  it('should send GET and return Observable<WorksItem>', () => {
    const id = 'someid';
    service.getWorksItemsById(id).subscribe(res => {
      expect(res).toEqual(dbData.worksItem);
    });

    const req = httpMock.expectOne(`${service.worksUri}/${id}`);
    expect(req.request.method).toBe("GET");
    req.flush(dbData.worksItem);
  });

  it('should send POST and return Observable<WorksItem>', () => {
    const formData = new FormData();
    formData.append('worksItem', JSON.stringify(dbData.worksItem));

    service.createWorksItem(formData).subscribe(res => {
      expect(res).toEqual(dbData.worksItem);
    });

    const req = httpMock.expectOne(service.worksUri, formData.toString());
    expect(req.request.method).toBe("POST");
    req.flush(dbData.worksItem);
  });

  it('should send PUT and return Observable<WorksItem>', () => {
    const formData = new FormData();
    const id = 'someid';
    formData.append('worksItem', JSON.stringify(dbData.worksItem));

    service.updateWorksItem(id, formData).subscribe(res => {
      expect(res).toEqual(dbData.worksItem);
    });

    const req = httpMock.expectOne(`${service.worksUri}/${id}`, formData.toString());
    expect(req.request.method).toBe("PUT");
    req.flush(dbData.worksItem);
  });

  it('should send PATCH and return Observable<WorksItem>', () => {
    const id = 'someid';
    const participantId = 'someparticipantid';
    const body = {
      participants: ['someid']
    }

    service.updateWorksItemParticipants(id, participantId, body).subscribe(res => {
      expect(res).toEqual(dbData.worksItem);
    });

    const req = httpMock.expectOne(`${service.worksUri}/${id}/${participantId}`);
    expect(req.request.method).toBe("PATCH");
    req.flush(dbData.worksItem);
  });

  it('should send DELETE and return Observable<WorksItem>', () => {
    const id = 'someid';

    service.deleteWorksItem(id).subscribe(res => {
      expect(res).toEqual(dbData.worksItem);
    });

    const req = httpMock.expectOne(`${service.worksUri}/${id}`);
    expect(req.request.method).toBe("DELETE");
    req.flush(dbData.worksItem);
  });
});
