import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { AuthService } from "@core/services/auth.service";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends UnsubscribeOnDestroy implements OnInit {
  public forgotPasswordForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _toaster: ToasterService,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required]],
    })
  }

  sendMail(): void {
    if (this.forgotPasswordForm.invalid) {
      this._toaster.showErrorMessage('Please put the correct email');
      return;
    }

    const {email} = this.forgotPasswordForm.value;

    this._authService.forgotPassword(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Please, check your email');
      });
  }

}
