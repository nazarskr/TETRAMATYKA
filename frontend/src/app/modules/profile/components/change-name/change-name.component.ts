import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserNameDialogData } from "@shared/interfaces/dialog";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserProfile } from "@shared/interfaces/user";

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.scss']
})
export class ChangeNameComponent implements OnInit {
  public userNameForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangeNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserNameDialogData,
    private _toaster: ToasterService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(): void {
    this.userNameForm = this._formBuilder.group({
      firstName: [this.data.profile?.firstName || '', Validators.required],
      lastName: [this.data.profile?.lastName || '', Validators.required],
    })
  }

  saveUserName(): void {
    if (this.userNameForm.invalid) {
      this._toaster.showErrorMessage('Please fill all required fields');
      return;
    }

    const user: UserProfile = {...this.userNameForm.value};
    this.dialogRef.close(user);
  }

}
