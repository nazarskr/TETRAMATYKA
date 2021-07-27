import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ParticipantsService } from '../../services/participants/participants.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Participant } from '@shared/interfaces/participants';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { SimpleDialogComponent } from '@shared/components/simple-dialog/simple-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { simpleQuillConfig } from '@shared/constants/quill-config';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

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
  public participantForm: FormGroup;
  public quillConfig = {...simpleQuillConfig};
  public imageUrl: SafeUrl;
  public multipartFile: File;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _participantsService: ParticipantsService,
    private _toaster: ToasterService,
    private _dialog: MatDialog,
    private _sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _translateService: TranslateService
  ) {
    super();
    this.initForm();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        this.participantId = params.get('id');
        if (this.participantId) {
          this.getParticipantById();
        } else {
          this.addNew = true;
          this.editMode = true;
        }
      });
  }

  initForm(): void {
    this.participantForm = this._formBuilder.group({
      fullName_UA: ['', Validators.required],
      fullName_EN: ['', Validators.required],
      bio_UA: ['', Validators.required],
      bio_EN: ['', Validators.required]
    })
  }

  formPatchValue(): void {
    this.participantForm.patchValue({
      fullName_UA: this.participant.fullName.ua,
      fullName_EN: this.participant.fullName.en,
      bio_UA: this.participant.bio.ua,
      bio_EN: this.participant.bio.en
    })
  }

  getParticipantById(): void {
    this._participantsService.getParticipantById(this.participantId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Participant) => {
        this.participant = res;
        this.imageUrl = res.imageUrl;
        this.formPatchValue();
      });
  }

  goToParticipantsList(): void {
    this._router.navigate(['/participants'])
  }

  editParticipant(): void {
    this.editMode = true;
  }

  saveParticipant(): void {
    if (this.participantForm.invalid) {
      this._toaster.showErrorMessage('Fill all required fields')
      return;
    }

    if (!this.imageUrl && !this.multipartFile) {
      this._toaster.showErrorMessage('Image is required')
      return;
    }

    const formValue = this.participantForm.value;
    const body: Participant = {
      fullName: {
        en: formValue.fullName_EN,
        ua: formValue.fullName_UA
      },
      bio: {
        en: formValue.bio_EN,
        ua: formValue.bio_UA
      },
      imageUrl: this.participant ? this.participant.imageUrl : ''
    }

    const formData = new FormData();
    formData.append('participantDto', JSON.stringify(body));
    if (this.multipartFile) {
      formData.append('image', this.multipartFile);
    }
    this.participantId ? this.updateParticipant(formData) : this.createParticipant(formData);
  }

  createParticipant(formData: FormData): void {
    this._participantsService.createParticipant(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Participant created successfully');
        // const id = res._id or res;
        // this.openCreatedParticipant(id);
      });
  }

  updateParticipant(formData: FormData): void {
    this._participantsService.updateParticipant(this.participantId, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Participant updated successfully');
        // this.getParticipantById();
      });
  }

  openCreatedParticipant(id: string): void {
    this._router.navigate([`participant/${id}`]);
  }

  cancelEditing(): void {
    if (this.addNew) {
      this.goToParticipantsList();
    } else {
      this.editMode = false;
      this.getParticipantById();
    }
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
