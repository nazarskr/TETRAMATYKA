import {Component, Input, OnInit} from '@angular/core';
import {Participant} from '@shared/interfaces/participants';
import {Project} from '@shared/interfaces/projects';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-titled-items-list',
  templateUrl: './titled-items-list.component.html',
  styleUrls: ['./titled-items-list.component.scss']
})
export class TitledItemsListComponent implements OnInit {
  @Input() items: Participant[] | Project[] = [];
  @Input() titleProp: string;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
  }

}
