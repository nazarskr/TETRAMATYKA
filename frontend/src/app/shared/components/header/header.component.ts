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
import { Router } from '@angular/router';

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
    return this._appInitService.currentYear && this._appInitService.currentYear.year;
  }
  // TODO remove mock

  constructor(
    private _userService: UserService,
    private _archiveService: ArchiveService,
    private _appInitService: AppInitService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllArchiveYears();
    this.detectArchiveYearsChange();
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
    if (archiveYear.year < 2019) {
      switch (archiveYear.year) {
        case 2013:
          window.open('https://tetramatyka.nurt.org.ua/archive/Tetramatyka2013.html', '_blank');
          break;
        case 2015:
          window.open('https://tetramatyka.nurt.org.ua/archive/Tetramatyka2015.html', '_blank');
          break;
        case 2017:
          window.open('https://tetramatyka.nurt.org.ua', '_blank');
          break;
        default:
          break;
      }
    } else {
      this._appInitService.currentYear = archiveYear;
      this.getAllArchiveYears();
      this._router.navigate(['/home']);
    }
  }

  toggleArchiveNarrowMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showYearsListNarrow = !this.showYearsListNarrow;
  }

  detectArchiveYearsChange(): void {
    this._archiveService.archiveYearsUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAllArchiveYears();
      })
  }

}
