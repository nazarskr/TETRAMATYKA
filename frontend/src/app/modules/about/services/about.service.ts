import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AboutInfo } from '@shared/interfaces/about';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private aboutUri = '/api/about';

  constructor(private http: HttpClient) { }

  getAboutInfo(): Observable<AboutInfo[]> {
    return this.http.get<AboutInfo[]>(this.aboutUri);
  }

  addAboutInfo(data: FormData): Observable<AboutInfo> {
    return this.http.post<AboutInfo>(this.aboutUri, data);
  }

  updateAboutInfo(id: string, data: FormData): Observable<AboutInfo> {
    return this.http.put<AboutInfo>(`${this.aboutUri}/${id}`, data);
  }

  deleteAboutInfo(id: string): Observable<AboutInfo> {
    return this.http.delete<AboutInfo>(`${this.aboutUri}/${id}`);
  }
}
