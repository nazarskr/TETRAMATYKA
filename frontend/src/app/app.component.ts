import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { SwUpdate } from "@angular/service-worker";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { UserService } from "@core/services/user.service";
import { UserInfo } from "@shared/interfaces/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _toaster: ToasterService,
    private _userService: UserService
  ) {}

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
}
