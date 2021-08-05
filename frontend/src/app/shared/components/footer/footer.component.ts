import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footerImages = ['ucf_logo.png', 'lviv_logo.png', 'logo_lmr.png'];

  constructor() { }

  ngOnInit(): void {
  }

}
