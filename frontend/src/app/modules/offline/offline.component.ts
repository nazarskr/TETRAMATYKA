import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {

  constructor(
    readonly _router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this._router.navigate(['/']);
  }
}
