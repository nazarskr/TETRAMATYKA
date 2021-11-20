import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '@core/services/user.service';
import {Observable} from 'rxjs';
import {RoleEnum} from '@shared/enums/role';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    readonly _userService: UserService,
    private router: Router
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const isUser = this._userService.userInfo &&
      (this._userService.userInfo.role === RoleEnum.ADMIN || this._userService.userInfo.role === RoleEnum.USER);
    if (!isUser) {
      this.router.navigateByUrl('/auth/login');
    }
    return isUser;
  }
}
