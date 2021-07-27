import { Component, OnInit } from '@angular/core';
import { ParticipantShort } from '@shared/interfaces/participants';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { Router } from '@angular/router';
import { ParticipantsService } from './services/participants/participants.service';
import { TranslateService } from '@ngx-translate/core';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent extends UnsubscribeOnDestroy implements OnInit {
  public participants: ParticipantShort[] = [];

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _router: Router,
    private _participantsService: ParticipantsService,
    private _translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllParticipants();
  }

  getAllParticipants(): void {
    this._participantsService.getAllParticipants()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ParticipantShort[]) => {
        this.participants = res;
      })
  }
}
