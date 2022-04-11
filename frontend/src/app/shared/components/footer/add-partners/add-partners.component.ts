import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "@shared/interfaces/dialog";
import {TranslateService} from "@ngx-translate/core";
import {ToasterService} from "@shared/services/toaster/toaster.service";
import {takeUntil} from "rxjs/operators";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {UnsubscribeOnDestroy} from "@shared/directives/unsubscribe-on-destroy";
import {PartnersService} from "@shared/services/partners/partners.service";

@Component({
  selector: 'app-add-partners',
  templateUrl: './add-partners.component.html',
  styleUrls: ['./add-partners.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddPartnersComponent extends UnsubscribeOnDestroy {
  public imagesForUpload = [];
  public uploadingProgress = 0;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AddPartnersComponent>,
    private _translateService: TranslateService,
    private _toaster: ToasterService,
    private _partnersService: PartnersService
  ) {
    super();
  }

  uploadImages(): void {
    if (this.imagesForUpload.length === 0) {
      this._toaster.showWarningMessage('Please add files or close modal window');
      return;
    }

    if (this.imagesForUpload.length > 10) {
      this._toaster.showWarningMessage('You can upload only 10 images at a time');
      return;
    }

    const formData = new FormData();
    this.imagesForUpload.forEach(item => {
      formData.append('images', item.file);
    });
    this._partnersService.addPartners(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadingProgress = Math.round(event.loaded / event.total * 100);
        }
        if (event.type === HttpEventType.Response) {
          this._toaster.showMessage('Images successfully uploaded');
          this.dialogRef.close(true);
        }
      }, () => {
        this.uploadingProgress = 0;
      });
  }

  onFilesUpload(event): void {
    this.imagesForUpload.push(...event);
  }

  removeImage(index: number): void {
    this.imagesForUpload.splice(index, 1);
  }

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }
}
