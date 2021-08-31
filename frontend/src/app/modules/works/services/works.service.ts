import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorksItem, WorksItemShort } from '@shared/interfaces/works';

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  public worksUri = '/api/works'
  constructor(private http: HttpClient) { }

  getAllWorks(): Observable<WorksItem[]> {
    return this.http.get<WorksItem[]>(this.worksUri);
  }

  getAllWorksShort(): Observable<WorksItemShort[]> {
    return this.http.get<WorksItemShort[]>(`${this.worksUri}/short`);
  }

  getWorksForParticipant(childrenIds: string[]): Observable<WorksItem[]> {
    const params: any = {
      childrenIds
    };

    return this.http.get<WorksItem[]>(`${this.worksUri}/participant`, {params});
  }

  getWorksItemsById(id: string): Observable<WorksItem> {
    return this.http.get<WorksItem>(`${this.worksUri}/${id}`);
  }

  createWorksItem(data: FormData): Observable<WorksItem> {
    return this.http.post<WorksItem>(this.worksUri, data);
  }

  updateWorksItem(id: string, data: FormData): Observable<WorksItem> {
    return this.http.put<WorksItem>(`${this.worksUri}/${id}`, data);
  }

  deleteWorksItem(id: string): Observable<WorksItem> {
    return this.http.delete<WorksItem>(`${this.worksUri}/${id}`);
  }
}
