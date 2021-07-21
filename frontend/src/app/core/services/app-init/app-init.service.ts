import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchiveYear } from '@shared/interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  public currentYearUri = '/api/archive-manager/current';
  public currentYear: ArchiveYear;

  constructor(private http: HttpClient) { }

  getCurrentYear(): void {
    this.http.get(this.currentYearUri)
      .subscribe((res: ArchiveYear) => {
        this.currentYear = res;
      });
  }
}
