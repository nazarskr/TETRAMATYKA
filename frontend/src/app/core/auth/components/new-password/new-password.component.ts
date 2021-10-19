import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { ConfirmPasswordValidator } from "@shared/validators/confirm-password.validator";
import { Router } from "@angular/router";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { AuthService } from "@core/services/auth.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-create-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent extends UnsubscribeOnDestroy implements OnInit {
  public createPasswordForm: FormGroup;
  public showPassword = false;

  constructor(
    private _toaster: ToasterService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.createPasswordForm = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: ConfirmPasswordValidator('password', 'confirmPassword')
    });
  }

  savePassword(): void {
    if (this.createPasswordForm.invalid) {
      this._toaster.showErrorMessage('Please fill all required fields');
      return;
    }

    const body = {...this.createPasswordForm.value};
    const url = this._router.url;
    this._authService.saveNewPassword(url, body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage(`Password successfully saved`);
        this._router.navigate(['/auth/login']);
      });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

}
