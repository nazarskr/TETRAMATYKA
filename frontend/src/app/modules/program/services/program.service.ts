import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProgramItem } from "@shared/interfaces/program";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  public programUri = '/api/program';

  constructor(private http: HttpClient) { }

  getAllProgramItems(): Observable<ProgramItem[]> {
    return this.http.get<ProgramItem[]>(this.programUri);
  }

  createProgramItem(body: ProgramItem): Observable<ProgramItem> {
    return this.http.post<ProgramItem>(this.programUri, body);
  }

  updateProgramItem(id: string, body: ProgramItem): Observable<ProgramItem> {
    return this.http.put<ProgramItem>(`${this.programUri}/${id}`, body);
  }

  deleteProgramItem(id: string): Observable<ProgramItem> {
    return this.http.delete<ProgramItem>(`${this.programUri}/${id}`);
  }
}
