import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Partner } from "@shared/interfaces/partners";

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  public partnersUri = '/api/partners';

  constructor(private http: HttpClient) {}

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.partnersUri);
  }

  addPartners(data: FormData): Observable<any> {
    return this.http.post(this.partnersUri, data, {
      reportProgress: true, observe: 'events'
    });
  }

  deletePartner(id: string): Observable<Partner> {
    return this.http.delete<Partner>(`${this.partnersUri}/${id}`)
  }
}
