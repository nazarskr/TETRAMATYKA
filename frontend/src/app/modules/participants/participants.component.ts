import { Component, OnInit } from '@angular/core';
import { ParticipantShort } from '@shared/interfaces/participants';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { Router } from '@angular/router';
import { ParticipantsService } from './services/participants/participants.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent extends UnsubscribeOnDestroy implements OnInit {
  public participants: ParticipantShort[] = [];

  constructor(
    private _router: Router,
    private _participantsService: ParticipantsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllParticipants();
  }

  getAllParticipants(): void {
    this.participants = [
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'},
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'},
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'},
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'},
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'},
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'},
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'},
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'},
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'},
      {_id: 'fkgjfkg', fullName: 'Nazar Skrypnyk'}
    ];
  }

  addParticipant(): void {
    this._router.navigate(['/new']);
  }
}
