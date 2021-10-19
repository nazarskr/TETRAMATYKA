import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { WorksItem } from "@shared/interfaces/works";
import { Participant } from "@shared/interfaces/participants";

@Component({
  selector: 'app-item-details-view',
  templateUrl: './item-details-view.component.html',
  styleUrls: ['./item-details-view.component.scss']
})
export class ItemDetailsViewComponent implements OnInit {
  @Input() item: WorksItem | Participant;
  @Input() imageUrl: SafeUrl;
  @Input() titleProp: string = 'title';
  @Input() descriptionProp: string = 'description';
  @Input() greyImage: boolean = false;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
  }

}
