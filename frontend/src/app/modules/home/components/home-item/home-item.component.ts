import { Component, Input, OnInit } from '@angular/core';
import { NewsItemShort } from '@shared/interfaces/news';
import { ProjectShort } from '@shared/interfaces/projects';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss']
})
export class HomeItemComponent implements OnInit {
  @Input() item: NewsItemShort | ProjectShort;
  @Input() type: string;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _translateService: TranslateService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
}
