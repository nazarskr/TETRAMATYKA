import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArchiveYear } from '../../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  public archiveManagerUri = '/api/archive-manager';

  constructor(private http: HttpClient) { }

  getAllArchiveYears(): Observable<any> {
    return this.http.get(this.archiveManagerUri);
  }

  createArchiveYear(body: ArchiveYear): Observable<any> {
    return this.http.post(this.archiveManagerUri, body);
  }

  updateArchiveYears(body: ArchiveYear[]): Observable<any> {
    return this.http.patch(this.archiveManagerUri, body);
  }

  deleteArchiveYear(id: string): Observable<any> {
    return this.http.delete(`${this.archiveManagerUri}/${id}`);
  }
}
