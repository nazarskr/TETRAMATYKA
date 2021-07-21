import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent implements OnInit {
  public locales = environment.locales;
  public selectedLanguage = environment.defaultLocale;
  constructor(readonly _translateService: TranslateService) { }

  ngOnInit(): void {
  }

  changeLanguage(locale: string) {
    this.selectedLanguage = locale;
    this._translateService.use(this.selectedLanguage);
  }

}
