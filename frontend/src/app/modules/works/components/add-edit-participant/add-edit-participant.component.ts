import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { Participant } from '@shared/interfaces/participants';
import { SimpleDialogComponent } from '@shared/components/simple-dialog/simple-dialog.component';
import { modalConfig } from '@shared/constants/modal-config';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantsService } from '../../../participants/services/participants/participants.service';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DialogData } from '@shared/interfaces/dialog';

@Component({
  selector: 'app-add-edit-participant',
  templateUrl: './add-edit-participant.component.html',
  styleUrls: ['./add-edit-participant.component.scss']
})
export class AddEditParticipantComponent extends UnsubscribeOnDestroy implements OnInit {
  public participant: Participant;
  public participantForm: FormGroup;
  public imageUrl: SafeUrl;
  public multipartFile: File;

  constructor(
    public dialogRef: MatDialogRef<AddEditParticipantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
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
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.participantForm = this._formBuilder.group({
      fullName_UA: ['', Validators.required],
      fullName_EN: ['', Validators.required],
      bio_UA: ['', Validators.required],
      bio_EN: ['', Validators.required]
    });

    if (this.data.item) {
      this.participant = this.data.item;
      this.imageUrl = this.data.item.imageUrl;
      this.formPatchValue();
    }
  }

  formPatchValue(): void {
    this.participantForm.patchValue({
      fullName_UA: this.participant.fullName.ua,
      fullName_EN: this.participant.fullName.en,
      bio_UA: this.participant.bio.ua,
      bio_EN: this.participant.bio.en
    })
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
      imageUrl: this.participant ? this.participant.imageUrl : '',
      works: this.participant ? this.participant.works : [this.data.parentId]
    }

    const formData = new FormData();
    formData.append('participant', JSON.stringify(body));
    if (this.multipartFile) {
      formData.append('image', this.multipartFile);
    }
    this.participant ? this.updateParticipant(formData) : this.createParticipant(formData);
  }

  createParticipant(formData: FormData): void {
    this._participantsService.createParticipant(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Participant created successfully');
        this.closeModal(true);
      });
  }

  updateParticipant(formData: FormData): void {
    this._participantsService.updateParticipant(this.participant._id, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Participant updated successfully');
        this.closeModal(true);
      });
  }

  changeImage(data: any): void {
    this.multipartFile = data.file;
    this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(data.url);
  }

  openClearImageDialog(): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, modalConfig.clearImage);
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

  closeModal(res: boolean) {
    this.dialogRef.close(res);
  }
}
