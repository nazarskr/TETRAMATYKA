import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '@shared/interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public contactsUri = '/api/contacts';

  constructor(
    private http: HttpClient
  ) { }

  getAllContacts() {
    return this.http.get(this.contactsUri);
  }

  updatePositionIndexes(body: Contact[]) {
    return this.http.patch(this.contactsUri, body);
  }

  createContact(body: Contact) {
    return this.http.post(this.contactsUri, body);
  }

  updateContact(id: string, body: Contact) {
    return this.http.put(`${this.contactsUri}/${id}`, body);
  }

  deleteContact(id: string) {
    return this.http.delete(`${this.contactsUri}/${id}`);
  }
}
