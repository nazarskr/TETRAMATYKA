import {Component, Input, OnInit} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-item-details-view',
  templateUrl: './item-details-view.component.html',
  styleUrls: ['./item-details-view.component.scss']
})
export class ItemDetailsViewComponent implements OnInit {
  @Input() item: any;
  @Input() imageUrl: SafeUrl;
  @Input() titleProp: string = 'title';
  @Input() descriptionProp: string = 'description';

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
  }

}
