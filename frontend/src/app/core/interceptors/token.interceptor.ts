import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { AuthService } from "@core/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _toaster: ToasterService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const method = request.method;
    if (method !== 'GET') {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this._toaster.showErrorMessage('You are unauthorized. Please login again');
            this._authService.logout();
          } else if (error.status === 0) {
            // TODO navigate to offline
          } else {
            // TODO error handler for post/put/patch/delete requests
          }
          return throwError(error.message);
        })
      );
  }
}
