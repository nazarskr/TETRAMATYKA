import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('mobileLogoContainer', {static: false}) mobileLogoContainer: ElementRef;
  public bigLogo: SafeHtml;
  public verticalLogo: SafeHtml;
  public bubblesList = [];
  public posterScale = 1;

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    this.bigLogo = this._sanitizer.bypassSecurityTrustHtml(bigLogo);
    this.verticalLogo = this._sanitizer.bypassSecurityTrustHtml(verticalLogo);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.addInteraction();
  }

  addInteraction(): void {
    const logoContainers = [this.logoContainer, this.mobileLogoContainer];
    logoContainers.forEach((logoContainer: ElementRef, index: number) => {
      const animationHeight = index === 0 ? 1300 : 2000;
      this.bubblesList = logoContainer.nativeElement.querySelectorAll('.st0');
      this.bubblesList.forEach((item) => {
        item.addEventListener('mouseover', () => {
          if (!item.classList.contains('animated')) {
            item.addEventListener("mousemove", () => {
              item.style.transform = `translateY(-${animationHeight}px)`;
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
    });
  }

  onScrollChange() {
    this.posterScale = 2 - (document.body.clientHeight - window.pageYOffset) / document.body.clientHeight;
  }

}
