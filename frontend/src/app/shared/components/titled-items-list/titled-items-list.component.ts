import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import Shuffle from 'shufflejs';

@Component({
  selector: 'app-titled-items-list',
  templateUrl: './titled-items-list.component.html',
  styleUrls: ['./titled-items-list.component.scss']
})
export class TitledItemsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('shuffleContainer', {static: false}) shuffleContainer: ElementRef;
  @ViewChild('shuffleSizer') private shuffleSizer: ElementRef;
  @Input() items = [];
  @Input() titleProp: string;
  public transformedItems = [];
  public movingInterval = null;
  public blackBackground = false;

  private shuffleInstance: Shuffle;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
    this.fillListByEmptyItems();
  }

  ngAfterViewInit() {
    this.addShuffleInstance();
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
        item.transform = 0;
        return item;
      });
    }
  }

  addShuffleInstance(): void {
    this.shuffleInstance = new Shuffle(this.shuffleContainer.nativeElement, {
      itemSelector: '.titled-item-wrapper',
      sizer: this.shuffleSizer.nativeElement,
      isCentered: true,
      speed: 3500
    });

    this.dynamicallyUpdateItems();
  }

  dynamicallyUpdateItems(): void {
    this.movingInterval = setInterval(() => {
      this.shuffleInstance.sort({
        randomize: true
      });
    }, 11000);
  }

  getTranslateValue(): string {
    const randomX = Math.ceil(Math.random() * 10);
    const randomY = Math.ceil(Math.random() * 30);
    const translateX = Math.random() < 0.5 ? -randomX : randomX;
    const translateY = Math.random() < 0.5 ? -randomY : randomY;
    return `translate(${translateX}px, ${translateY}px)`;
  }

  onResize(): void {
    this.fillListByEmptyItems();
  }

  onMouseEnter(item): void {
    clearInterval(this.movingInterval);
    item.hovered = true;
  }

  onMouseLeave(item): void {
    this.dynamicallyUpdateItems();
    item.hovered = false;
  }

  ngOnDestroy(): void {
    clearInterval(this.movingInterval);
  }

}
