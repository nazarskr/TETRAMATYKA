import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ParticipantsService } from '../../services/participants/participants.service';
import { takeUntil } from 'rxjs/operators';
import { Participant } from '@shared/interfaces/participants';
import { WorksService } from '../../../works/services/works.service';
import { WorksItem } from '@shared/interfaces/works';

@Component({
  selector: 'app-participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.scss']
})
export class ParticipantDetailsComponent extends UnsubscribeOnDestroy implements OnInit {
  public participantId: string;
  public participant: Participant;
  public works: WorksItem[] = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _worksService: WorksService,
    private _participantsService: ParticipantsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        this.participantId = params.get('id');
        this.getParticipantById();
      });
  }

  getParticipantById(): void {
    this._participantsService.getParticipantById(this.participantId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Participant) => {
        this.participant = res;
      });
  }

  goToParticipantsList(): void {
    this._router.navigate(['/participants'])
  }

}
