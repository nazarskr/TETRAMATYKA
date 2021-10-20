import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { AuthService } from "@core/services/auth.service";
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _toaster: ToasterService,
    private _router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const method = request.method;
    if (token && method !== 'GET') {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this._authService.logout();
          } else if (err.status === 0 || err.status === 504) {
            this._router.navigate(['/offline'])
          }

          if(request.url.includes('/api/auth')) {
            this._toaster.showErrorMessage(err.error.message);
          }
          return throwError(err.error);
        })
      );
  }
}
