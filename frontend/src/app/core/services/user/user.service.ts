import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../../../modules/shared/interfaces/user';
import { RoleEnum } from '../../../modules/shared/enums/role';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public userInfo: UserInfo = {
    email: '',
    fullName: '',
    role: RoleEnum.GUEST
  };
  public currentUserRole: BehaviorSubject<string> = new BehaviorSubject('GUEST');

  constructor() { }
}
