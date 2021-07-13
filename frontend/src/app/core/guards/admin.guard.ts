import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { RoleEnum } from '../../modules/shared/enums/role';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    readonly _userService: UserService,
    private router: Router
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const isAdmin = this._userService.userInfo &&
      (this._userService.userInfo.role === RoleEnum.ADMIN);
    if (!isAdmin) {
      this.router.navigateByUrl('/home');
    }
    return isAdmin;
  }
}
