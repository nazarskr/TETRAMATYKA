import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-item-details-secondary',
  templateUrl: './item-details-secondary.component.html',
  styleUrls: ['./item-details-secondary.component.scss']
})
export class ItemDetailsSecondaryComponent implements OnInit {
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
