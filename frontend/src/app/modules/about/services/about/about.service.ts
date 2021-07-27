import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  addAboutInfo(body: AboutInfo): Observable<FormData> {
    return this.http.post<FormData>(this.aboutUri, body);
  }

  updateAboutInfo(id: string, body: AboutInfo): Observable<ArrayBuffer> {
    const params: any = {id};
    return this.http.put(this.aboutUri, body, params);
  }

  deleteAboutInfo(id: string): Observable<ArrayBuffer> {
    const params: any = {id};
    return this.http.delete(this.aboutUri, params);
  }
}
