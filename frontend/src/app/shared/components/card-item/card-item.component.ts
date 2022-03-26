import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NewsItemShort } from '@shared/interfaces/news';
import { ProjectShort } from '@shared/interfaces/projects';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GalleryChapter } from "@shared/interfaces/gallery";

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() item: NewsItemShort | ProjectShort | GalleryChapter;
  @Input() type: string;
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _translateService: TranslateService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onItemClick(): void {
    if (this.type) {
      this._router.navigate([])
    } else {
      this.clicked.emit();
    }
    // routerLink="{{type ? type + '/' + item._id : null}}"
  }
}
