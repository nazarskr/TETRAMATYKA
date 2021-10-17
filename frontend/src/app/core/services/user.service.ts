import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo, UserProfile } from '@shared/interfaces/user';
import { HttpClient } from "@angular/common/http";
import { initialUser } from "@shared/constants/utils";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public userInfo: UserInfo = {...initialUser};
  public currentUserRole: BehaviorSubject<string> = new BehaviorSubject(this.userInfo.role);
  public usersUri = '/api/users';

  constructor(
    private http: HttpClient
  ) { }

  getUser(token: string) {
    return this.http.get(`${this.usersUri}/current/${token}`);
  }

  changeProfileInfo(id: string, body: UserProfile) {
    return this.http.post(`${this.usersUri}/change-profile/${id}`, body);
  }

  setInitialUser() {
    this.userInfo = {...initialUser};
    this.currentUserRole.next(this.userInfo.role);
  }

  changeUser(user: UserInfo) {
    this.userInfo = {...user};
    this.currentUserRole.next(this.userInfo.role);
  }
}
