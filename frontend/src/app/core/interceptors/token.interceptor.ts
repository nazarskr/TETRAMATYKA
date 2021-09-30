import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserService} from "@core/services/user.service";
import {Observable} from "rxjs";
import {AppInitService} from "@core/services/app-init.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    readonly userService: UserService,
    readonly appInitService: AppInitService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userInfo = this.userService.userInfo;
    const currentYear = this.appInitService.currentYear;
    const method = request.method;
    if (userInfo && currentYear && method !== 'GET') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userInfo.role + currentYear.year}`
        }
      });
    }
    return next.handle(request);
  }
}
