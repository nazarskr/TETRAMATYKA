import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {

  constructor(readonly _location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this._location.back();
  }
}
