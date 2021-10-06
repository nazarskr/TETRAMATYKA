import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { SwUpdate } from "@angular/service-worker";
import { ToasterService } from "@shared/services/toaster/toaster.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _swUpdate: SwUpdate,
    private _toaster: ToasterService
  ) {
    this._swUpdate.available.subscribe(() => {
      this._toaster.showMessage('Updates!');
      this._swUpdate.activateUpdate().then(() => {
        document.location.reload();
      })
    })
  }

  ngOnInit(): void {
    registerLocaleData(localeUk, 'ua');
    this._translateService.use(environment.defaultLocale);
  }
}
