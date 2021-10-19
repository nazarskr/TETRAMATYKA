import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { UserCredential, UserInfo, UserRegisterGoogle } from "@shared/interfaces/user";
import { AuthService } from "@core/services/auth.service";
import { UserService } from "@core/services/user.service";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { TokenRes } from "@shared/interfaces/common";
import {patterns} from "@shared/constants/patterns";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends UnsubscribeOnDestroy implements OnInit {
  public loginForm: FormGroup;
  public showPassword = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _toaster: ToasterService,
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
    private _socialAuthService: SocialAuthService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(patterns.password)]]
    })
  }

  login(): void {
    if (this.loginForm.invalid) {
      this._toaster.showErrorMessage('Please fill all required fields');
      return;
    }

    const body: UserCredential = {...this.loginForm.value};
    this._authService.login(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: TokenRes) => {
        localStorage.setItem('token', res.token);
        this.getUser(res.token);
      });

  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle(): void {
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        const {firstName, lastName, email} = res;
        const userRegister = {firstName, lastName, email};
        this.registerGoogleUser(userRegister);
      });
  }

  registerGoogleUser(userRegister: UserRegisterGoogle): void {
    this._authService.saveGoogleUser(userRegister)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: TokenRes) => {
        localStorage.setItem('token', res.token);
        this.getUser(res.token);
      })
  }

  getUser(token: string): void {
    this._userService.getUser(token)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: UserInfo) => {
        this._userService.changeUser(res);
        this._router.navigate(['/profile']);
      })
  }
}
