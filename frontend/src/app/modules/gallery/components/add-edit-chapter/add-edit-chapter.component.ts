import {Component, Inject, OnInit} from '@angular/core';
import {Participant} from "@shared/interfaces/participants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "@shared/interfaces/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ToasterService} from "@shared/services/toaster/toaster.service";
import {TranslateService} from "@ngx-translate/core";
import {filter, takeUntil} from "rxjs/operators";
import {SimpleDialogComponent} from "@shared/components/simple-dialog/simple-dialog.component";
import {modalConfig} from "@shared/constants/modal-config";
import {GalleryChapter} from "@shared/interfaces/gallery";
import {GalleryService} from "../../services/gallery.service";
import {UnsubscribeOnDestroy} from "@shared/directives/unsubscribe-on-destroy";

@Component({
  selector: 'app-add-edit-chapter',
  templateUrl: './add-edit-chapter.component.html',
  styleUrls: ['./add-edit-chapter.component.scss']
})
export class AddEditChapterComponent extends UnsubscribeOnDestroy implements OnInit {
  public galleryChapter: GalleryChapter;
  public galleryChapterForm: FormGroup;
  public imageUrl: SafeUrl;
  public multipartFile: File;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    public dialogRef: MatDialogRef<AddEditChapterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _galleryService: GalleryService,
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
    this.galleryChapterForm = this._formBuilder.group({
      title_UA: ['', Validators.required],
      title_EN: ['', Validators.required],
    });

    if (this.data.item) {
      this.galleryChapter = this.data.item;
      this.imageUrl = this.data.item.imageUrl;
      this.formPatchValue();
    }
  }

  formPatchValue(): void {
    this.galleryChapterForm.patchValue({
      title_UA: this.galleryChapter.title.ua,
      title_EN: this.galleryChapter.title.en,
    })
  }

  saveChapter(): void {
    if (this.galleryChapterForm.invalid) {
      this._toaster.showErrorMessage('Fill all required fields')
      return;
    }

    if (!this.imageUrl && !this.multipartFile) {
      this._toaster.showErrorMessage('Image is required')
      return;
    }

    const formValue = this.galleryChapterForm.value;
    const body: GalleryChapter = {
      title: {
        en: formValue.title_EN,
        ua: formValue.title_UA
      },
      imageUrl: this.galleryChapter ? this.galleryChapter.imageUrl : '',
    }

    const formData = new FormData();
    formData.append('galleryChapter', JSON.stringify(body));
    if (this.multipartFile) {
      formData.append('image', this.multipartFile);
    }
    this.galleryChapter ? this.updateGalleryChapter(formData) : this.createGalleryChapter(formData);
  }

  createGalleryChapter(formData: FormData): void {
    this._galleryService.addGalleryChapter(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Gallery chapter created successfully');
        this.closeModal(true);
      });
  }

  updateGalleryChapter(formData: FormData): void {
    this._galleryService.updateGalleryChapter(this.galleryChapter._id, formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Gallery chapter updated successfully');
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
