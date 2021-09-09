import { Injectable } from '@angular/core';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    readonly _toaster: ToasterService
  ) { }

  getYearsList(): number[] {
    const yearsArr = [];
    for (let i = 2011; i < 2050; i++) {
      yearsArr.push(i);
    }

    return yearsArr;
  }

  fileSizeValidation(size: number, maxSize: number): boolean {
    if (size > maxSize) {
      this._toaster.showErrorMessage('Sorry, your file is too big for upload here.');
      return true;
    }
    return false;
  }

  convertDateToLocale(date: Date): string {
    if (!date) {
      return null;
    }
    const localDate = moment(date).format('YYYY-MM-DDTHH:mm');
    return localDate;
  }
}
