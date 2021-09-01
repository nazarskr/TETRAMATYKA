import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { Participant } from '@shared/interfaces/participants';
import { WorksItem } from '@shared/interfaces/works';
import {SimpleDialogComponent} from '@shared/components/simple-dialog/simple-dialog.component';
import {filter, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {WorksService} from '../../services/works.service';
import {ParticipantsService} from '../../../participants/services/participants/participants.service';
import {ToasterService} from '@shared/services/toaster/toaster.service';
import {AddEditWorksItemComponent} from '../add-edit-works-item/add-edit-works-item.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-works-details',
  templateUrl: './works-details.component.html',
  styleUrls: ['./works-details.component.scss']
})
export class WorksDetailsComponent extends UnsubscribeOnDestroy implements OnInit {
  public worksItemId: string;
  public worksItem: WorksItem;
  public participants: Participant[] = [];

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _toaster: ToasterService,
    private _activatedRoute: ActivatedRoute,
    private _worksService: WorksService,
    private _participantService: ParticipantsService
  ) {
    super();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        this.worksItemId = params.get('id');
        this.getWorksItemById();
      });
  }

  getWorksItemById(): void {
    this._worksService.getWorksItemsById(this.worksItemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: WorksItem) => {
        this.worksItem = res;

      });
  }

  getParticipantForWorksItem(): void {
    if (this.worksItem.participants && this.worksItem.participants.length > 0) {
      this._participantService.getParticipantsForWorksItem(this.worksItem.participants)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: Participant[]) => {
          this.participants = res;
        })
    }
  }

  editWorksItem(): void {
    const dialogRef = this._dialog.open(AddEditWorksItemComponent, {
      data: {
        title: 'Edit works item',
        worksItem: this.worksItem
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.getWorksItemById();
      });
  }

  openDeleteWorksItemDialog(): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete works item',
        message: 'Are you sure you want to delete this works item?'
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.deleteWorksItem();
      });
  }

  deleteWorksItem(): void {
    this._worksService.deleteWorksItem(this.worksItem._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Works item deleted successfully');
      })
  }

  goToWorksList(): void {
    this._router.navigate(['/works']);
  }

}
