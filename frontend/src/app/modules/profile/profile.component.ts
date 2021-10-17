import { Component, OnInit } from '@angular/core';
import { ChangeNameComponent } from "./components/change-name/change-name.component";
import {filter, take, takeUntil} from "rxjs/operators";
import {UserChangePassword, UserInfo, UserProfile} from "@shared/interfaces/user";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { MatDialog } from "@angular/material/dialog";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { UserService } from "@core/services/user.service";
import { AuthService } from "@core/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends UnsubscribeOnDestroy implements OnInit {
  public user = this._userService.userInfo;

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
        title: 'COMMON.CHANGE_NAME',
        profile: {
          firstName: this.user.firstName,
          lastName: this.user.lastName
        }
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe((res: UserProfile) => {
        this.changeUserName(res);
      });
  }

  changeUserName(profile: UserProfile): void {
    const id = this._userService.userInfo._id;
    this._userService.changeProfileInfo(id, profile)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getUser();
        this._toaster.showMessage('User saved successfully');
      })
  }

  getUser(): void {
    const token = localStorage.getItem('token');
    this._userService.getUser(token)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: UserInfo) => {
        this._userService.changeUser(res);
        this.user = this._userService.userInfo;
      });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this._dialog.open(ChangePasswordComponent, {
      data: {
        title: 'COMMON.CHANGE_NAME'
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
