import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserChangePassword, UserCredential } from "@shared/interfaces/user";
import { UserService } from "@core/services/user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  login(body: UserCredential) {
    return this.http.post('/auth/login', body);
  }

  logout() {
    localStorage.removeItem('token');
    this.userService.setInitialUser();
    this.router.navigate(['/home']);
  }

  createPassword(url: string) {
    const apiUrl = '/api' + url;
    return this.http.post(apiUrl, {});
  }

  register(body: UserCredential) {
    return this.http.post('/auth/register', body);
  }

  forgotPassword(email: string) {
    return this.http.post('/auth/forgot-password/', email);
  }

  changeUserPassword(body: UserChangePassword) {
    return this.http.post('/api/user/change-profile', body);
  }
}
