import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '@shared/interfaces/user';
import { RoleEnum } from '@shared/enums/role';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // TODO need GUEST by default
  public userInfo: UserInfo = {
    email: '',
    fullName: '',
    role: RoleEnum.ADMIN
  };
  public currentUserRole: BehaviorSubject<string> = new BehaviorSubject('ADMIN');

  constructor() { }
}
