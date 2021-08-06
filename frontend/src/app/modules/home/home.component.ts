import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { bigLogo } from './graphic/big-logo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public bigLogo: SafeHtml;

  constructor(
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.bigLogo = this._sanitizer.bypassSecurityTrustHtml(bigLogo);
  }

}
