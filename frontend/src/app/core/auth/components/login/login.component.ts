import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import {UserCredential, UserInfo} from "@shared/interfaces/user";
import { AuthService } from "@core/services/auth.service";
import { UserService } from "@core/services/user.service";
import {UnsubscribeOnDestroy} from "@shared/directives/unsubscribe-on-destroy";
import {takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";

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
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
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
      .subscribe((res: string) => {
        localStorage.setItem('token', res);
        this.getUser();
      }, (err) => {
        this._toaster.showErrorMessage(err.error.message);
      })

  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  getUser(): void {
    this._userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: UserInfo) => {
        this._userService.userInfo = res;
        this._router.navigate(['/profile']);
      })
  }
}
