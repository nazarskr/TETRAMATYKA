import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { ConfirmPasswordValidator } from "@shared/validators/confirm-password.validator";
import { Router } from "@angular/router";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import {AuthService} from "@core/services/auth.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent extends UnsubscribeOnDestroy implements OnInit {
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

    const url = this._router.url;
    const isCreatePassword = url.startsWith('/auth/create-password');
    this._authService.createPassword(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage(`Password successfully ${isCreatePassword ? 'created' : 'updated'}`);
        this._router.navigate(['/login']);
      });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

}
