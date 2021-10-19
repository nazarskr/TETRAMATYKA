import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmPasswordValidator } from "@shared/validators/confirm-password.validator";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { UserRegister } from "@shared/interfaces/user";
import { AuthService } from "@core/services/auth.service";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";
import {patterns} from "@shared/constants/patterns";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends UnsubscribeOnDestroy implements OnInit {
  public registerForm: FormGroup;
  public showPassword = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _toaster: ToasterService,
    private _authService: AuthService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(patterns.password)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(patterns.password)]],
    }, {
      validators: ConfirmPasswordValidator('password', 'confirmPassword')
    })
  }

  registerUser(): void {
    if (this.registerForm.invalid) {
      this._toaster.showErrorMessage('Please fill all required fields');
      return;
    }

    const body: UserRegister = {...this.registerForm.value};
    this._authService.register(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('User registered successfully');
        this._router.navigate(['/auth/login']);
      }, err => {
        this._toaster.showErrorMessage(err.error.message);
      });

  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
