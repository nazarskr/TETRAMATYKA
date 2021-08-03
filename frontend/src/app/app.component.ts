import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _translateService: TranslateService) {
  }

  ngOnInit(): void {
    registerLocaleData(localeUk, 'ua');
    this._translateService.use(environment.defaultLocale);
  }
}
