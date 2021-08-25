import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '@shared/services/data/data.service';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { maxFileSize } from "@shared/constants/max-file-size";

@Component({
  selector: 'app-drag-n-drop-upload',
  templateUrl: './drag-n-drop-upload.component.html',
  styleUrls: ['./drag-n-drop-upload.component.scss']
})
export class DragNDropUploadComponent implements OnInit {
  @Input() acceptMimetype = '*';
  @Input() multiple = false;
  @Input() maxFileSize: number = maxFileSize.image;
  @Output() fileUploaded: EventEmitter<any> = new EventEmitter();

  constructor(
    readonly _dataService: DataService,
    readonly _toaster: ToasterService
  ) { }

  ngOnInit(): void {
  }

  fileInputUpload(event): void {
    const files = event.target.files;
    this.dropzoneUpload(files);
  }

  dropzoneUpload(files: File[]): void {
    const areFilesValid = this.validateFiles(files);
    if (!areFilesValid) {
      return;
    }
    if (!this.multiple) {
      const reader = new FileReader();
      reader.onload =  (e) => {
        const url = e.target.result as string;
        this.fileUploaded.emit({
          file: files[0],
          url
        });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  validateFiles(files: File[]): boolean {
    let areFilesValid = true;
    if (!this.multiple && files.length > 1) {
      this._toaster.showErrorMessage('You can upload only one file here');
      return false;
    }

    for (const file of files) {
      if (this._dataService.fileSizeValidation(file.size, this.maxFileSize)) {
        areFilesValid = false;
        break;
      }
      const mimetype = this.acceptMimetype.slice(0, this.acceptMimetype.indexOf('/'));
      if (!file.type.includes(mimetype)) {
        this._toaster.showErrorMessage('Sorry, you can upload this file here');
        areFilesValid = false;
        break;
      }
    }

    return areFilesValid;
  }
}
