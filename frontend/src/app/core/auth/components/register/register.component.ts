import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { ConfirmPasswordValidator } from "@shared/validators/confirm-password.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public showPassword = false;

  constructor(
    private _toaster: ToasterService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this._formBuilder.group({
      email: [{value: '', disabled: true}, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
        validators: ConfirmPasswordValidator('password', 'confirmPassword')
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this._toaster.showErrorMessage('Please fill all required fields');
      return;
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

}
