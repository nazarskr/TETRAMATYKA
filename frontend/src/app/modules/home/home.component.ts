import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { bigLogo } from './graphic/big-logo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('logoContainer', {static: false}) logoContainer: ElementRef;
  public bigLogo: SafeHtml;
  public bubblesList = [];

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    this.bigLogo = this._sanitizer.bypassSecurityTrustHtml(bigLogo);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.bubblesList = this.logoContainer.nativeElement.querySelectorAll('.st0');
    this.bubblesList.forEach((item) => {
      const positionX = Math.round(item.getBoundingClientRect().left);
      const positionY = Math.round(item.getBoundingClientRect().top);

      item.addEventListener('mouseover', () => {
        if (!item.classList.contains('animated')) {
          item.addEventListener("mousemove", (e) => {
            item.style.transform = `translate(${e.offsetX - positionX}px, ${e.offsetY - positionY}px) scale(1.1)`;
          });
          item.classList.add('animated');
        }
      });

      item.addEventListener('animationend', () => {
        if (item.classList.contains('animated')) {
          item.classList.remove('animated');
          item.style.transform = 'translate(0, 0)';
        }
      });
    })
  }

}
