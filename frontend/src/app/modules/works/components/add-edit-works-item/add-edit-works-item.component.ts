import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantsService } from '../../../participants/services/participants.service';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { filter, takeUntil } from 'rxjs/operators';
import { SimpleDialogComponent } from '@shared/components/simple-dialog/simple-dialog.component';
import { modalConfig } from '@shared/constants/modal-config';
import { WorksItem } from '@shared/interfaces/works';
import { WorksService } from '../../services/works.service';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { DialogData } from '@shared/interfaces/dialog';

@Component({
  selector: 'app-add-edit-works-item',
  templateUrl: './add-edit-works-item.component.html',
  styleUrls: ['./add-edit-works-item.component.scss']
})
export class AddEditWorksItemComponent extends UnsubscribeOnDestroy implements OnInit {
  public worksItem: WorksItem;
  public worksItemForm: FormGroup;
  public imageUrl: SafeUrl;
  public multipartFile: File;

  constructor(
    public dialogRef: MatDialogRef<AddEditWorksItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _worksService: WorksService,
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
    this.worksItemForm = this._formBuilder.group({
      title_UA: ['', Validators.required],
      title_EN: ['', Validators.required],
      description_UA: ['', Validators.required],
      description_EN: ['', Validators.required]
    });

    if (this.data.item) {
      this.worksItem = this.data.item;
      this.imageUrl = this.worksItem.imageUrl;
      this.formPatchValue();
    }
  }

  formPatchValue(): void {
    this.worksItemForm.patchValue({
      title_UA: this.worksItem.title.ua,
      title_EN: this.worksItem.title.en,
      description_UA: this.worksItem.description.ua,
      description_EN: this.worksItem.description.en
    })
  }

  saveWorksItem(): void {
    if (this.worksItemForm.invalid) {
      this._toaster.showErrorMessage('Fill all required fields')
      return;
    }

    if (!this.imageUrl && !this.multipartFile) {
      this._toaster.showErrorMessage('Image is required')
      return;
    }

    const formValue = this.worksItemForm.value;
    const body: WorksItem = {
      title: {
        en: formValue.title_EN,
        ua: formValue.title_UA
      },
      description: {
        en: formValue.description_EN,
        ua: formValue.description_UA
      },
      imageUrl: this.worksItem ? this.worksItem.imageUrl : '',
    }

    if (this.worksItem && this.worksItem.participants) {
      body.participants = this.worksItem.participants;
    }

    const formData = new FormData();
    formData.append('worksItem', JSON.stringify(body));
    if (this.multipartFile) {
      formData.append('image', this.multipartFile);
    }
    this.worksItem ? this.updateWorksItem(formData) : this.createWorksItem(formData);
  }

  createWorksItem(formData: FormData): void {
    this._worksService.createWorksItem(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: WorksItem) => {
        this._toaster.showMessage('Works item created successfully');
        this.closeModal(true);
      });
  }

  updateWorksItem(formData: FormData): void {
    this._worksService.updateWorksItem(this.worksItem._id, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Works item updated successfully');
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
