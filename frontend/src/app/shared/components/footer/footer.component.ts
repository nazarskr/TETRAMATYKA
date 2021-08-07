import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footerLogos = [
    'NURT_logo.png', 'ucf_logo.png', 'lviv_logo.png',
    'logo_lmr.png', 'CUH_Logo_ukr.png', 'sensoteka-lviv-logo.png',
    'amp_logo.png', 'Lviv_misto_literatury.png', 'logo_zemla.png',
    'EESEM_logo.png'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
