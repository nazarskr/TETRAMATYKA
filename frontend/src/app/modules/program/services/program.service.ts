import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {ProgramItem} from "@shared/interfaces/program";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  public programUri = '/api/program';

  constructor(private http: HttpClient) { }

  getAllProgramItems() {
    return this.http.get(this.programUri);
  }

  createProgramItem(body: ProgramItem) {
    return this.http.post(this.programUri, body);
  }

  updateProgramItem(id: string, body: ProgramItem) {
    return this.http.put(`${this.programUri}/${id}`, body);
  }

  deleteProgramItem(id: string) {
    return this.http.delete(`${this.programUri}/${id}`);
  }
}
