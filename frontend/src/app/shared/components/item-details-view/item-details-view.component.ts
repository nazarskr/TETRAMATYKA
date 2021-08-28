import {Component, Input, OnInit} from '@angular/core';
import {NewsItem} from '@shared/interfaces/news';
import {Project} from '@shared/interfaces/projects';
import {Participant} from '@shared/interfaces/participants';
import {SafeUrl} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-item-details-view',
  templateUrl: './item-details-view.component.html',
  styleUrls: ['./item-details-view.component.scss']
})
export class ItemDetailsViewComponent implements OnInit {
  @Input() item: Project | NewsItem | Participant;
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
