import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserChangePassword, UserCredential } from "@shared/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(body: UserCredential) {
    return this.http.post('/auth/login', body);
  }

  register(body: UserCredential) {
    return this.http.post('/auth/register', body);
  }

  changePassword(body: UserChangePassword) {
    return this.http.post('/auth/change-password', body);
  }

  forgotPassword(email: string) {
    return this.http.post('/auth/change-password/', {email});
  }
}
