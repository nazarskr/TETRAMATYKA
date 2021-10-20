import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { UserService } from "@core/services/user.service";
import { UserInfo } from "@shared/interfaces/user";
import { ConnectionService } from 'ng-connection-service';
import { Router } from '@angular/router';
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isOnline = true;

  constructor(
    private _translateService: TranslateService,
    private _toaster: ToasterService,
    private _userService: UserService,
    private _connectionService: ConnectionService,
    private _router: Router,
    private _updates: SwUpdate
  ) {
    this.detectConnectionStatus();
  }

  ngOnInit(): void {
    registerLocaleData(localeUk, 'ua');
    this._translateService.use(environment.defaultLocale);
    this.initLoggedUser();
  }

  initLoggedUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this._userService.getUser(token)
        .subscribe((user: UserInfo) => {
          this._userService.changeUser(user);
        });
    }
  }

  detectSwUpdates(): void {
    this._updates.available.subscribe(() => {
      this._updates.activateUpdate().then(() => {
        window.location.reload();
      })
    })
  }

  detectConnectionStatus(): void {
    this._connectionService.monitor().subscribe(isConnected => {
      if (!this.isOnline && isConnected) {
        this._toaster.showWarningMessage('You are online how. Page will be reloaded in 2 seconds');
        setTimeout(() => {
          const url = this._router.url;
          if (url.includes('/offline') || url.includes('/page-not-found')) {
            this._router.navigate(['/']);
          } else {
            window.location.reload();
          }
        }, 2000);
      } else {
        this._toaster.showWarningMessage('You are offline now');
      }
      this.isOnline = isConnected;
    })
  }
}
