import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.scss']
})
export class ParticipantDetailsComponent extends UnsubscribeOnDestroy implements OnInit {

  constructor(
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
  }

  goToParticipantsList(): void {
    this._router.navigate(['/participants'])
  }

}
