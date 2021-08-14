import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { bigLogo } from './graphic/big-logo';
import { verticalLogo } from './graphic/vertical-logo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('logoContainer', {static: false}) logoContainer: ElementRef;
  public bigLogo: SafeHtml;
  public verticalLogo: SafeHtml;
  public bubblesList = [];

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    this.bigLogo = this._sanitizer.bypassSecurityTrustHtml(bigLogo);
    this.verticalLogo = this._sanitizer.bypassSecurityTrustHtml(verticalLogo);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.logoContainer) {
      this.bubblesList = this.logoContainer.nativeElement.querySelectorAll('.st0');
      this.bubblesList.forEach((item) => {
        item.addEventListener('mouseover', () => {
          if (!item.classList.contains('animated')) {
            item.addEventListener("mousemove", () => {
              item.style.transform = `translateY(-451px)`;
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

}
