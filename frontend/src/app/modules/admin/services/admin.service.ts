import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {UserInfo} from "@shared/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public usersUri = '/api/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get(this.usersUri);
  }

  createUser(body: UserInfo) {
    return this.http.post(this.usersUri, body);
  }

  updateUser(id: string, body: UserInfo) {
    return this.http.put(`${this.usersUri}/${id}`, body);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.usersUri}/${id}`);
  }
}
