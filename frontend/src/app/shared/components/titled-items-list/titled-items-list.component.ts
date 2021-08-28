import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-titled-items-list',
  templateUrl: './titled-items-list.component.html',
  styleUrls: ['./titled-items-list.component.scss']
})
export class TitledItemsListComponent implements OnInit, OnDestroy {
  @Input() items = [];
  @Input() titleProp: string;
  transformedItems = [];
  movingInterval = null;
  tremblingInterval = null;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
    this.fillListByEmptyItems();
    this.dynamicallyUpdateItems();
    this.setTremblingAnimation();
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
    this.movingInterval = setInterval(() => {
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

  setTremblingAnimation(): void {
    this.tremblingInterval = setInterval(() => {
      const notEmptyItems = this.transformedItems.filter(item => item);
      const randomIndex = Math.floor(Math.random() * notEmptyItems.length);
      const randomTimeout = Math.floor(Math.random() * 1000 + 500); // min: 500, max: 1500
      const animationLength = 300;

      setTimeout(() => {
        notEmptyItems[randomIndex].trembling = true;
      }, randomTimeout);

      setTimeout(() => {
        notEmptyItems[randomIndex].trembling = false;
      }, randomTimeout + animationLength);
    }, 1500);
  }

  onResize(): void {
    this.fillListByEmptyItems();
  }

  ngOnDestroy(): void {
    clearInterval(this.tremblingInterval);
    clearInterval(this.movingInterval);
  }

}
