import { Component, OnInit } from '@angular/core';
import { ParticipantShort } from '@shared/interfaces/participants';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { ParticipantsService } from './services/participants.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent extends UnsubscribeOnDestroy implements OnInit {
  public participants: ParticipantShort[] = [];

  constructor(private _participantsService: ParticipantsService) {
    super();
  }

  ngOnInit(): void {
    this.getAllParticipantsShort();
  }

  getAllParticipantsShort(): void {
    this._participantsService.getAllParticipantsShort()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ParticipantShort[]) => {
        this.participants = res;
      })
  }
}
