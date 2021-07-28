import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AboutInfo} from '@shared/interfaces/about';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private aboutUri = '/api/about';

  constructor(private http: HttpClient) { }

  getAboutInfo(): Observable<AboutInfo[]> {
    return this.http.get<AboutInfo[]>(this.aboutUri);
  }

  addAboutInfo(data: FormData) {
    return this.http.post(this.aboutUri, data);
  }

  updateAboutInfo(id: string, data: FormData) {
    return this.http.put(`${this.aboutUri}/${id}`, data);
  }

  deleteAboutInfo(id: string): Observable<ArrayBuffer> {
    const params: any = {id};
    return this.http.delete(this.aboutUri, params);
  }
}
