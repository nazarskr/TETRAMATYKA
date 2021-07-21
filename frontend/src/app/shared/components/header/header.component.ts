import { Component, OnInit } from '@angular/core';
import { mainRoutes } from '../../constants/menu';
import { UserService } from '@core/services/user/user.service';
import { RoleEnum } from '../../enums/role';
import { takeUntil } from 'rxjs/operators';
import { ArchiveYear } from '@shared/interfaces/admin';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { ArchiveService } from '@shared/services/archive/archive.service';
import { AppInitService } from '@core/services/app-init/app-init.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('yearsList', [
      state('show', style({
        opacity: 1,
        maxHeight: '1000px'
      })),
      state('hide', style({
        opacity: 0,
        maxHeight: 0
      })),
      transition('hide => show',
        animate(800)),
      transition('show => hide',
        animate(200)),
    ]),
  ]
})
export class HeaderComponent extends UnsubscribeOnDestroy implements OnInit {
  public wideMenuRoutes = [...mainRoutes.slice(1)];
  public fixedMenuRoutes = [...mainRoutes];
  public archiveYears: ArchiveYear[] = [];
  public isMenuOpened = false;
  public showYearsListNarrow = false;
  // TODO remove mock
  public userRole = RoleEnum.GUEST;
  get roles(): string[] {
    return Object.keys(RoleEnum);
  }

  get currentYear(): number {
    return this._appInitService.currentYear.year;
  }

  constructor(
    private _userService: UserService,
    private _archiveService: ArchiveService,
    private _appInitService: AppInitService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllArchiveYears();
  }

  toggleOpenMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.showYearsListNarrow = false;
  }

  changeUserRole(): void {
    this._userService.currentUserRole.next(this.userRole);
    this._userService.userInfo.role = this.userRole;
  }

  getAllArchiveYears(): void {
    this._archiveService.getAllArchiveYears()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ArchiveYear[]) => {
        this.archiveYears = res.filter(item => item.available && item.year !== this.currentYear);
      });
  }

  changeArchiveYear(archiveYear: ArchiveYear): void {
    this._appInitService.currentYear = archiveYear;
    this.getAllArchiveYears();
  }

  toggleArchiveNarrowMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showYearsListNarrow = !this.showYearsListNarrow;
  }

}
