import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroy} from '@shared/directives/unsubscribe-on-destroy';
import { Contact } from '@shared/interfaces/contact';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog} from '@angular/material/dialog';
import { SimpleDialogComponent } from '@shared/components/simple-dialog/simple-dialog.component';
import { filter, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {
  @ViewChild('form', {static: false}) form: FormGroupDirective;
  @Input() showButtons: boolean;
  @Input() contact: Contact;
  @Output() cancelCreate: EventEmitter<void> = new EventEmitter();
  @Output() contactsListUpdated: EventEmitter<void> = new EventEmitter();
  public contactForm: FormGroup;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    private _translateService: TranslateService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _toaster: ToasterService,
    private _contactsService: ContactsService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contact && changes.contact.currentValue) {
      this.initForm();
    }
  }

  initForm(): void {
    this.contactForm = this._formBuilder.group({
      title_UA: [this.contact.title.ua, Validators.required],
      title_EN: [this.contact.title.en, Validators.required],
      email: [this.contact.email, Validators.required],
      phone: this.contact.phone
    })
  }

  editContact(): void {
    this.contact.editable = true;
  }

  cancelEditing(): void {
    this.contact.editable = false;
    if (this.contact._id) {
      this.initForm();
    } else {
      this.cancelCreate.emit();
    }
  }

  submitForm(): void {
    this.form.ngSubmit.emit();
  }

  saveContact(): void {
    if (this.contactForm.invalid) {
      this._toaster.showErrorMessage('Please fill all required fields');
      return;
    }

    const formValue = this.contactForm.value;
    const body: Contact = {
      title: {
        ua: formValue.title_UA,
        en: formValue.title_EN
      },
      email: formValue.email,
      phone: formValue.phone,
      positionIndex: this.contact.positionIndex
    }

    this.contact._id ? this.updateContact(body) : this.createContact(body);
  }

  createContact(body: Contact): void {
    this._contactsService.createContact(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Contact) => {
        this.contact = res;
        this._toaster.showMessage('Contact created successfully');
      });
  }

  updateContact(body: Contact): void {
    this._contactsService.updateContact(this.contact._id, body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Contact) => {
        this.contact = res;
        this._toaster.showMessage('Contact updated successfully');
      });
  }

  openDeleteContactDialog(): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete contact item',
        message: `Are you sure you want to delete ${this.contact.title.en}?`
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.deleteContact();
      });
  }

  deleteContact(): void {
    this._contactsService.deleteContact(this.contact._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.contactsListUpdated.emit();
      });
  }
}
