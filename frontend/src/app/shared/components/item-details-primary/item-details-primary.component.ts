import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-details-primary',
  templateUrl: './item-details-primary.component.html',
  styleUrls: ['./item-details-primary.component.scss']
})
export class ItemDetailsPrimaryComponent implements OnInit {
  @Input() item: any;
  @Input() titleProp: string;
  @Input() descriptionProp: string;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }

}
