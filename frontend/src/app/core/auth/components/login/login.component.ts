import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "@shared/services/toaster/toaster.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public showPassword = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _toaster: ToasterService
  ) { }

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
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
