import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant, ParticipantShort } from '@shared/interfaces/participants';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private participantsUri = '/api/participants';

  constructor(private http: HttpClient) { }

  getAllParticipants(): Observable<ParticipantShort[]> {
    return this.http.get<ParticipantShort[]>(this.participantsUri);
  }

  getAllParticipantsShort(): Observable<ParticipantShort[]> {
    return this.http.get<ParticipantShort[]>(`${this.participantsUri}/short`);
  }

  getParticipantById(id: string): Observable<Participant> {
    return this.http.get<Participant>(`${this.participantsUri}/${id}`);
  }

  createParticipant(formData: FormData): Observable<Participant> {
    return this.http.post<Participant>(this.participantsUri, formData);
  }

  updateParticipant(id: string, formData: FormData): Observable<Participant> {
    return this.http.put<Participant>(`${this.participantsUri}/${id}`, formData);
  }

  deleteParticipant(id: string): Observable<Participant> {
    return this.http.delete<Participant>(`${this.participantsUri}/${id}`);
  }
}
