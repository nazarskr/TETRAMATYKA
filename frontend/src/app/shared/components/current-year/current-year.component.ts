import {Component, OnInit} from '@angular/core';
import {UserService} from "@core/services/user.service";
import {AppInitService} from "@core/services/app-init.service";
import {RoleEnum} from "@shared/enums/role";

@Component({
  selector: 'app-current-year',
  templateUrl: './current-year.component.html',
  styleUrls: ['./current-year.component.scss']
})
export class CurrentYearComponent implements OnInit {
  get currentYear(): number {
    return this._appInitService.currentYear && this._appInitService.currentYear.year;
  }

  get isYearActual(): boolean {
    return this._appInitService.currentYear && this._appInitService.currentYear.current;
  }

  get isAdmin(): boolean {
    return this._userService.userInfo.role === RoleEnum.ADMIN;
  }

  get displayCurrentYear(): boolean {
    return this.isAdmin || this.isYearActual;
  }

  constructor(
    private _userService: UserService,
    private _appInitService: AppInitService
  ) { }

  ngOnInit(): void {
  }

}
