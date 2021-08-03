import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: 'localDate',
  pure: false
})
export class LocalDatePipe implements PipeTransform {
  get lang(): string {
    return this.translateService.currentLang;
  }

  constructor(
    private translateService: TranslateService) {
  }

  transform(value: any, pattern: string): any {
    const datePipe: DatePipe = new DatePipe(this.lang);
    return datePipe.transform(value, pattern);
  }

}
