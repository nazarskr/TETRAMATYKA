import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '@core/services/user/user.service';

@Directive({
  selector: '[userPermission]'
})
export class UserPermissionDirective implements OnInit {
  public userRole: string;
  public permissions: string[] = [];

  @Input()
  set userPermission(val: string[]) {
    this.permissions = val;
    this.updateView();
  }

  constructor(
    private _userService: UserService,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.detectRoleChanges();
  }

  detectRoleChanges(): void {
    this._userService.currentUserRole
      .subscribe(res => {
        this.userRole = res;
        this.updateView();
      });
  }

  updateView(): void {
    this.viewContainer.clear();
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  checkPermission(): boolean {
    return this.permissions.some(val => {
      return val === this.userRole || val === 'ALL';
    });
  }
}
