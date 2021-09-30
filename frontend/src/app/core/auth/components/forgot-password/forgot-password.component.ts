import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "@shared/services/toaster/toaster.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _toaster: ToasterService
  ) { }

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
  }

}
