import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserService } from "@core/services/user.service";
import { takeUntil } from "rxjs/operators";
import { UserInfo } from "@shared/interfaces/user";
import { AuthService } from "@core/services/auth.service";

@Component({
  template: '<div></div>'
})
export class GoogleLoginResultComponent extends UnsubscribeOnDestroy implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _authService: AuthService
  ) {
    super();
    this.detectGoogleAuthResult();
  }

  ngOnInit(): void {
  }

  detectGoogleAuthResult(): void {
    this._route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        const token = params.get('token');
        if (token) {
          localStorage.setItem('token', token);
          this.getUser();
        } else {
          this._authService.logout();
        }
      });
  }

  getUser(): void {
    this._userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: UserInfo) => {
        this._userService.userInfo = res;
        this._router.navigate(['/profile']);
      })
  }
}
