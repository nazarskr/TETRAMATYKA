import { Component, OnInit } from '@angular/core';
import { ParticipantShort } from '@shared/interfaces/participants';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  public participants: ParticipantShort[] = [
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
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
