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
    console.log(this.bubblesList);
    this.bubblesList.forEach((item) => {
      item.addEventListener('')
    })
  }

}
