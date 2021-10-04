import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo, UserProfile } from '@shared/interfaces/user';
import { RoleEnum } from '@shared/enums/role';
import { HttpClient } from "@angular/common/http";
import { initialUser } from "@shared/constants/utils";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // TODO remove mock
  public userInfo: UserInfo = {
    email: 'new.user@mail.com',
    firstName: 'New',
    lastName: 'User',
    role: RoleEnum.ADMIN
  };
  // remove above and uncomment below
  // public userInfo: UserInfo = {...initialUser};
  public currentUserRole: BehaviorSubject<string> = new BehaviorSubject(this.userInfo.role);

  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    return this.http.get('/api/user');
  }

  changeProfileInfo(body: UserProfile) {
    return this.http.post('/api/user/change-profile', body);
  }

  setInitialUser() {
    this.userInfo = {...initialUser};
    this.currentUserRole.next(this.userInfo.role);
  }
}
