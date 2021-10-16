import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppInitService } from '../services/app-init.service';
import {currentYearUrls} from "@shared/constants/current-year-urls";

@Injectable()
export class CurrentYearInterceptor implements HttpInterceptor {
  constructor(readonly appInitService: AppInitService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentYear = this.appInitService.currentYear;
    if (currentYear && this.checkRoutes(request.url)) {
      request = request.clone({
        setParams: {
          year: `${currentYear.year}`
        }
      });
    }
    return next.handle(request);
  }

  checkRoutes(url: string): boolean {
    return currentYearUrls.some(item => url.includes(item));
  }
}
