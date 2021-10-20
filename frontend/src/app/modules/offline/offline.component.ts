import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {

  constructor(
    readonly _router: Router,
    readonly _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this._router.navigate(['../../'], { relativeTo: this._route });
  }
}
