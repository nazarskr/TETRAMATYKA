import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { Contact } from '@shared/interfaces/contact';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserService } from '@core/services/user/user.service';
import { ContactsService } from './services/contacts.service';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from '@shared/services/toaster/toaster.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent extends UnsubscribeOnDestroy implements OnInit {
  public contactsList: Contact[] = [];

  get isAdmin(): boolean {
    return this._userService.userInfo.role === 'ADMIN';
  }

  get isAddNew(): boolean {
    return this.contactsList.some(item => !item._id);
  }

  constructor(
    private _userService: UserService,
    private _contactsService: ContactsService,
    private _toaster: ToasterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this._contactsService.getAllContacts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Contact[]) => {
        this.contactsList = res;
      })
  }

  dropListItem(event: CdkDragDrop<Contact[]>): void {
    moveItemInArray(this.contactsList, event.previousIndex, event.currentIndex);
    const updatedContacts = this.mapNewPositionIndexes();
    this.updatePositionIndexes(updatedContacts);
  }

  mapNewPositionIndexes(): Contact[] {
    return this.contactsList.map((item: Contact, index: number) => {
      item.positionIndex = index;
      return item;
    });
  }

  updatePositionIndexes(body: Contact[]): void {
    this._contactsService.updatePositionIndexes(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAllContacts();
        this._toaster.showMessage('Contacts updated successfully');
      })
  }

  addContact(): void {
    const positionIndex = this.definePositionIndex();
    this.contactsList.push({
      title: {
        ua: '',
        en: ''
      },
      email: '',
      phone: '',
      positionIndex,
      editable: true
    })
  }

  definePositionIndex(): number {
    if (this.contactsList.length === 0) {
      return 0;
    } else {
      return this.contactsList[this.contactsList.length -1].positionIndex + 1;
    }
  }

  cancelCreate(): void {
    this.contactsList = this.contactsList.filter(item => item._id);
  }

}
