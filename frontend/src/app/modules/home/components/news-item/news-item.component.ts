import { Component, Input, OnInit } from '@angular/core';
import { NewsItemShort } from '@shared/interfaces/news';
import { ProjectShort } from '@shared/interfaces/projects';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
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

  openItem(): void {
    const link = this.type === 'project' ? `projects/${this.item._id}`
      : `home/news/${this.item._id}`;
    this._router.navigate([link]);
  }
}
