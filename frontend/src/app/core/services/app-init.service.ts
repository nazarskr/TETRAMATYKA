import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchiveYear } from '@shared/interfaces/admin';
import {initialYear} from "@shared/constants/utils";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  public currentYearUri = '/api/archive-manager/current';
  public currentYear: ArchiveYear;

  constructor(private http: HttpClient) { }

  getCurrentYear(): Promise<ArchiveYear> {
     return new Promise((resolve) => {
      this.http.get(this.currentYearUri)
        .subscribe((res: ArchiveYear) => {
          this.currentYear = res;
          resolve({...this.currentYear});
        }, () => {
          this.currentYear = initialYear;
          resolve({...this.currentYear});
        });
    });
  }
}
