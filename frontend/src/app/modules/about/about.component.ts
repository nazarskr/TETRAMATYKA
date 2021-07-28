import { Component, OnInit, ViewChild } from '@angular/core';
import { AboutInfo } from '@shared/interfaces/about';
import { AboutService } from './services/about/about.service';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { filter, takeUntil } from 'rxjs/operators';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { simpleQuillConfig } from '@shared/constants/quill-config';
import { QuillEditorComponent } from 'ngx-quill';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from '@shared/components/simple-dialog/simple-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild(QuillEditorComponent, { static: true }) editor: QuillEditorComponent;
  public aboutForm: FormGroup;
  public aboutInfo: AboutInfo;
  public multipartFile: File;
  public editMode = false;
  public quillConfig = {...simpleQuillConfig};
  public imageUrl: SafeUrl;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _aboutService: AboutService,
    private _toaster: ToasterService,
    private _translateService: TranslateService,
    private _sanitizer: DomSanitizer,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {
    super();
    this.initForm();
  }

  ngOnInit(): void {
    this.getAboutInfo();
  }

  initForm(): void {
    this.aboutForm = this._formBuilder.group({
      text_UA: ['', Validators.required],
      text_EN: ['', Validators.required],
    })
  }

  formPatchValue(): void {
    this.aboutForm.patchValue({
      text_UA: this.aboutInfo.text.ua,
      text_EN: this.aboutInfo.text.en,
    })
  }

  getAboutInfo(): void {
    this._aboutService.getAboutInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: AboutInfo[]) => {
        if (res.length > 0) {
          this.aboutInfo = res[0];
          this.imageUrl = this.aboutInfo.imageUrl || '';
          this.formPatchValue();
        }
        this.editMode = false;
      });
  }

  editAboutInfo(): void {
    this.editMode = true;
  }

  cancelEditing(): void {
    this.getAboutInfo();
  }

  saveAboutInfo(): void {
    if (this.aboutForm.invalid) {
      this._toaster.showErrorMessage('Fill all required fields')
      return;
    }

    if (!this.imageUrl && !this.multipartFile) {
      this._toaster.showErrorMessage('Image is required')
      return;
    }

    const formValue = this.aboutForm.value;
    const body: AboutInfo = {
      text: {
        ua: formValue.text_UA,
        en: formValue.text_EN
      },
      imageUrl: this.aboutInfo ? this.aboutInfo.imageUrl : ''
    }
    const formData = new FormData();
    formData.append('aboutInfo', JSON.stringify(body))
    if (this.multipartFile) {
      formData.append('image', this.multipartFile);
    }
    this.aboutInfo ? this.updateAboutInfo(this.aboutInfo._id, formData)
      : this.addAboutInfo(formData);
  }

  addAboutInfo(data: FormData): void {
    this._aboutService.addAboutInfo(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('About info added successfully');
        this.getAboutInfo();
      });
  }

  updateAboutInfo(id: string, data: FormData): void {
    this._aboutService.updateAboutInfo(id, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('About info updated successfully');
        this.getAboutInfo();
      });
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
