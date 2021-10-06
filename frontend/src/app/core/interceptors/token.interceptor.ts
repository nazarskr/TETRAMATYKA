import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "@core/services/user.service";
import { Observable, throwError } from "rxjs";
import { AppInitService } from "@core/services/app-init.service";
import { catchError } from 'rxjs/operators';
import { ToasterService } from '@shared/services/toaster/toaster.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private appInitService: AppInitService,
    private toaster: ToasterService
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
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toaster.showErrorMessage('You are not an admin');
          } else {
            this.toaster.showErrorMessage('Something going wrond. Please ask software developer');
          }
          return throwError(error.message);
        })
      );
  }
}
