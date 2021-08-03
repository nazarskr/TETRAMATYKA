import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { ProgramService } from "../services/program.service";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { TranslateService } from "@ngx-translate/core";
import { ProgramItem } from "@shared/interfaces/program";
import { filter, takeUntil } from "rxjs/operators";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { SimpleDialogComponent } from "@shared/components/simple-dialog/simple-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-program-item',
  templateUrl: './program-item.component.html',
  styleUrls: ['./program-item.component.scss']
})
export class ProgramItemComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild('form', {static: false}) form: FormGroupDirective;
  @Input() programItem: ProgramItem;
  @Output() cancelCreate: EventEmitter<void> = new EventEmitter();
  @Output() programListUpdated: EventEmitter<void> = new EventEmitter();
  public programItemForm: FormGroup;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _programService: ProgramService,
    private _toaster: ToasterService,
    private _translateService: TranslateService,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.programItemForm = this._formBuilder.group({
      eventFullDate: [this.convertDateToLocale(this.programItem.eventFullDate), Validators.required],
      title_UA: [this.programItem.title.ua, Validators.required],
      title_EN: [this.programItem.title.en, Validators.required],
      info_UA: [this.programItem.info.ua, Validators.required],
      info_EN: [this.programItem.info.en, Validators.required]
    });
  }

  convertDateToLocale(dateIsoString: string): string {
    if (!dateIsoString) {
      return null;
    }
    console.log(new Date(dateIsoString).toLocaleString());
    return new Date(dateIsoString).toLocaleString();
  }

  editProgramItem(): void {
    this.programItem.editable = true;
  }

  cancelEditing(): void {
    this.programItem.editable = false;
    if (this.programItem._id) {
      this.initForm();
    } else {
      this.cancelCreate.emit();
    }
  }

  submitForm(): void {
    this.form.ngSubmit.emit();
  }

  saveProgramItem(): void {
    if (this.programItemForm.invalid) {
      this._toaster.showErrorMessage('Please fill all required fields');
      return;
    }

    const formValue = this.programItemForm.value;
    const body: ProgramItem = {
      title: {
        ua: formValue.title_UA,
        en: formValue.title_EN
      },
      info: {
        ua: formValue.info_UA,
        en: formValue.info_EN
      },
      eventFullDate: new Date(formValue.eventFullDate).toISOString()
    }

    this.programItem._id ? this.updateProgramItem(body) : this.createProgramItem(body);
  }

  createProgramItem(body: ProgramItem): void {
    this._programService.createProgramItem(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Program item created successfully');
      });
  }

  updateProgramItem(body: ProgramItem): void {
    this._programService.updateProgramItem(this.programItem._id, body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Program item updated successfully');
      });
  }

  openDeleteProgramItemDialog(): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete contact item',
        message: 'Are you sure you want to delete this event?'
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.deleteProgramItem();
      });
  }

  deleteProgramItem(): void {
    this._programService.deleteProgramItem(this.programItem._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Program item deleted successfully');
      });
  }
}
