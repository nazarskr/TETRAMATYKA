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
  @Input() items: any[] = [];
  @Input() titleProp: string;
  transformedItems: any[] = [];

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
    this.fillListByEmptyItems();
    this.dynamicallyUpdateItems();
  }

  fillListByEmptyItems(): void {
    if (window.innerWidth > 600) {
      const maxEmptyItems = this.items.length * 2;
      let randomIndexes = [];
      for (let i = 0; i < maxEmptyItems; i++) {
        randomIndexes.push(Math.floor(Math.random() * maxEmptyItems));
      }
      const blockIndexes = [...new Set(randomIndexes.sort((a, b) => a - b))];
      this.transformedItems = this.items.map(item => {
        item.transform = this.getTranslateValue();
        return item;
      });
      blockIndexes.forEach((randomIndex: number) => {
        this.transformedItems.splice(randomIndex + 1, 0, null);
      });
    } else {
      this.transformedItems = this.items.map(item => {
        item.translate = 0;
        return item;
      });
    }
  }

  dynamicallyUpdateItems(): void {
    setInterval(() => {
      this.transformedItems = this.transformedItems.map(item => {
        if (item) {
          item.transform = this.getTranslateValue();
        }

        return item;
      });
    }, 6000);
  }

  getTranslateValue(): string {
    const randomX = Math.ceil(Math.random() * 100);
    const randomY = Math.ceil(Math.random() * 50);
    const translateX = Math.random() < 0.5 ? -randomX : randomX;
    const translateY = Math.random() < 0.5 ? -randomY : randomY;
    return `translate(${translateX}px, ${translateY}px)`;
  }

  onResize(): void {
    this.fillListByEmptyItems();
  }

}
