import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { MatDialog } from "@angular/material/dialog";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { filter, takeUntil } from "rxjs/operators";
import { ChangeNameComponent } from "../change-name/change-name.component";
import { UserChangePassword, UserProfile } from "@shared/interfaces/user";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { UserService } from "@core/services/user.service";
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends UnsubscribeOnDestroy implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private _toaster: ToasterService,
    private _userService: UserService,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  openChangeNameDialog(): void {
    const dialogRef = this._dialog.open(ChangeNameComponent, {
      data: {
        title: 'Change name',
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe((res: UserProfile) => {
        this.changeUserName(res);
      });
  }

  changeUserName(profile: UserProfile): void {
    this._userService.changeUserProfile(profile)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('User saved successfully');
      })
  }

  openChangePasswordDialog(): void {
    const dialogRef = this._dialog.open(ChangePasswordComponent, {
      data: {
        title: 'Change password',
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe((res: UserChangePassword) => {
        this.changePassword(res);
      });
  }

  changePassword(res: UserChangePassword): void {
    this._authService.changeUserPassword(res)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Password changed successfully');
      });
  }

  logout(): void {
    this._authService.logout();
  }

}
