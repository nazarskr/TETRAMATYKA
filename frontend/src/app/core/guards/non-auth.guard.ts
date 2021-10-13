import {Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class NonAuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const isToken = !!localStorage.getItem('token');
    if (isToken) {
      this.router.navigateByUrl('/profile');
    }

    return isToken;
  }
}
