import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmPasswordValidator } from "@shared/validators/confirm-password.validator";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "@shared/interfaces/dialog";
import { UserChangePassword } from "@shared/interfaces/user";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public showPassword = false;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.changePasswordForm = this._formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: ConfirmPasswordValidator('newPassword', 'confirmPassword')
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  submitChangePassword(): void {
    if (this.changePasswordForm.invalid) {
      this._toaster.showErrorMessage('Please fill all required fields');
      return;
    }

    const passwords: UserChangePassword = {...this.changePasswordForm.value};
    this.dialogRef.close(passwords);
  }

}
