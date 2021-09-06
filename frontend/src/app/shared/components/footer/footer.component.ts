import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footerLogos = [
    'NURT_logo.png', 'ucf_logo.png', 'logo_lmr.png', 'lviv_logo.png',
    'CUH_Logo_ukr.png', 'logotype_LEM.png', 'sensoteka-lviv-logo.png',
    'EESEM_logo.png', 'amp_logo.png',
    'audio_art.png', 'Lviv_misto_literatury.png', 'logo_zemla.png',
    'muzyka_centrum.png', 'krakow_logo.png', 'logo_iam.png',
    'oead.png', 'IFU_UA.png'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
