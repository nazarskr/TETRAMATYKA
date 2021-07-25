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

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild(QuillEditorComponent, { static: true }) editor: QuillEditorComponent;
  public aboutInfo: AboutInfo = {
    imageUrl: '',
    text: {
      en: '',
      ua: ''
    }
  };
  public multipartFile: File;
  public editMode = false;
  public quillConfig = {...simpleQuillConfig};
  public imageUrl: SafeUrl;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    readonly _aboutService: AboutService,
    readonly _toaster: ToasterService,
    readonly _translateService: TranslateService,
    readonly _sanitizer: DomSanitizer,
    readonly _dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAboutInfo();
  }

  getAboutInfo(): void {
    this._aboutService.getAboutInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: AboutInfo[]) => {
        if (res.length > 0) {
          this.aboutInfo = res[0];
          this.imageUrl = this.aboutInfo.imageUrl || '';
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
    const formData = new FormData();
    formData.append('body', JSON.stringify(this.aboutInfo));
    if (this.multipartFile) {
      formData.append('image', this.multipartFile);
    }
    this.aboutInfo && this.aboutInfo._id ? this.updateAboutInfo(this.aboutInfo._id, formData)
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
