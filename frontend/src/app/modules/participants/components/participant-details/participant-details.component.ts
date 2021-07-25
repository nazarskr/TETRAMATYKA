import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ParticipantsService } from '../../services/participants/participants.service';
import {filter, takeUntil} from 'rxjs/operators';
import { Participant } from '@shared/interfaces/participants';
import {ToasterService} from '@shared/services/toaster/toaster.service';
import {SimpleDialogComponent} from '@shared/components/simple-dialog/simple-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {simpleQuillConfig} from '@shared/constants/quill-config';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.scss']
})
export class ParticipantDetailsComponent extends UnsubscribeOnDestroy implements OnInit {
  public addNew = false;
  public editMode = false;
  public participantId: string;
  public participant: Participant;
  public quillConfig = {...simpleQuillConfig};
  public imageUrl: SafeUrl;
  public multipartFile: File;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _participantsService: ParticipantsService,
    private _toaster: ToasterService,
    private _dialog: MatDialog,
    readonly _sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit(): void {
    this.initParticipant();
    this._activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        this.participantId = params.get('id');
        if (this.participantId) {
          this.getParticipantById();
        } else {
          this.addNew = true;
        }
      });
  }

  getParticipantById(): void {
    this._participantsService.getParticipantById(this.participantId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Participant) => {

      });
  }

  initParticipant(): void {
    this.participant = {
      fullName: {
        en: '',
        ua: ''
      },
      bio: {
        en: '',
        ua: ''
      }
    }
  }

  goToParticipantsList(): void {
    this._router.navigate(['/participants'])
  }

  editParticipant(): void {
    this.editMode = true;
  }

  saveParticipant(): void {
    // validate
    const formData = new FormData();
    this.participantId ? this.updateParticipant(formData) : this.createParticipant(formData);
  }

  createParticipant(formData: FormData): void {
    this._participantsService.createParticipant(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Participant created successfully');
      });
  }

  updateParticipant(formData: FormData): void {
    this._participantsService.updateParticipant(this.participantId, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Participant updated successfully');
      });
  }

  cancelEditing(): void {
    this.editMode = false;
    this.getParticipantById();
  }

  openDeleteParticipantDialog(): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete participant',
        message: 'Are you sure you want to delete this participant?'
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.deleteParticipant();
      });
  }

  deleteParticipant(): void {
    this._participantsService.deleteParticipant(this.participantId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.goToParticipantsList();
      })
  }

  changeImage(data: any): void {
    this.multipartFile = data.file;
    this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(data.url);
  }

  openClearImageDialog(): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      width: '300px',
      data: {
        title: 'Clear image',
        message: 'Do you want to clear image?'
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(res => !!res))
      .subscribe(() => {
        this.clearImage();
      });
  }

  clearImage(): void {
    this.multipartFile = null;
    this.imageUrl = null;
  }

}
