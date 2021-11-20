import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  UserChangePassword,
  UserCredential,
  UserRegister,
  UserRegisterGoogle,
  UserUpdatePassword
} from "@shared/interfaces/user";
import { UserService } from "@core/services/user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authUri = '/api/auth';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  login(body: UserCredential) {
    return this.http.post(`${this.authUri}/login`, body);
  }

  logout() {
    localStorage.removeItem('token');
    this.userService.setInitialUser();
    this.router.navigate(['/auth/login']);
  }

  saveNewPassword(url: string, body: UserUpdatePassword) {
    const apiUrl = '/api' + url;
    return this.http.post(apiUrl, body);
  }

  register(body: UserRegister) {
    return this.http.post(`${this.authUri}/register`, body);
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.authUri}/forgot-password`, {email});
  }

  changeUserPassword(body: UserChangePassword) {
    return this.http.post(`${this.authUri}/change-password`, body);
  }

  saveGoogleUser(googleToken: string, userRegister: UserRegisterGoogle) {
    const headers = new HttpHeaders();
    headers.set('Authorization',  googleToken)
    return this.http.post(`${this.authUri}/google-register`, userRegister);
  }
}
