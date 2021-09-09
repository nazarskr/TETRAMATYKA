import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '@shared/interfaces/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public contactsUri = '/api/contact';

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUri);
  }

  updatePositionIndexes(body: Contact[]): Observable<Contact[]> {
    return this.http.patch<Contact[]>(this.contactsUri, body);
  }

  createContact(body: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUri, body);
  }

  updateContact(id: string, body: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.contactsUri}/${id}`, body);
  }

  deleteContact(id: string): Observable<Contact> {
    return this.http.delete<Contact>(`${this.contactsUri}/${id}`);
  }
}
