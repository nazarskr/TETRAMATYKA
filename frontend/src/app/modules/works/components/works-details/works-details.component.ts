import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { Participant } from '@shared/interfaces/participants';
import { WorksItem } from '@shared/interfaces/works';

@Component({
  selector: 'app-works-details',
  templateUrl: './works-details.component.html',
  styleUrls: ['./works-details.component.scss']
})
export class WorksDetailsComponent extends UnsubscribeOnDestroy implements OnInit {
  public editMode = false;
  public worksItem: WorksItem;
  public participants: Participant[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
