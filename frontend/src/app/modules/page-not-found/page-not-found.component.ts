import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(readonly _router: Router) { }

  ngOnInit(): void {
  }

  goHome(): void {
    this._router.navigate(['/home']);
  }

}
