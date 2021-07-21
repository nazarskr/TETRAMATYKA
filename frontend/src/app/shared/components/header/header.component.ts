import { Component, OnInit } from '@angular/core';
import { mainRoutes } from '../../constants/menu';
import { UserService } from '@core/services/user/user.service';
import { RoleEnum } from '../../enums/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public wideMenuRoutes = [...mainRoutes.slice(1)];
  public fixedMenuRoutes = [...mainRoutes];
  public isMenuOpened = false;
  // TODO remove mock
  public userRole = RoleEnum.GUEST;
  get roles(): string[] {
    return Object.keys(RoleEnum);
  }

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  toggleOpenMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  changeUserRole(): void {
    this._userService.currentUserRole.next(this.userRole);
    this._userService.userInfo.role = this.userRole;
  }

}
