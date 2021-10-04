import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { UserInfo } from "@shared/interfaces/user";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { initialUser } from "@shared/constants/utils";
import { MatTableDataSource } from "@angular/material/table";
import { AdminService } from "../../services/admin.service";
import { filter, takeUntil } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SimpleDialogComponent } from "@shared/components/simple-dialog/simple-dialog.component";
import { tableColumns } from "@shared/constants/table-columns";
import { RoleEnum } from "@shared/enums/role";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends UnsubscribeOnDestroy implements OnInit {
  public displayedColumns: string[] = tableColumns.users;
  public users: UserInfo[] = [];
  public dataSource: MatTableDataSource<UserInfo> = new MatTableDataSource();
  public userForm: FormGroup;
  public roles = ['ADMIN'];

  constructor(
    private _toaster: ToasterService,
    private _adminService: AdminService,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.initUserForm();
    this.getUsers();
  }

  initUserForm(): void {
    this.userForm = this._formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      _id: '',
    })
  }

  formPatchValue(user: UserInfo): void {
    this.userForm.patchValue({...user});
  }

  resetForm(): void {
    this.userForm.patchValue({
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      _id: ''
    })
  }

  getUsers(): void {
    this._adminService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: UserInfo[]) => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.resetForm();
      })
  }

  addUser(): void {
    if (this.isCurrentlyEditable()) {
      this._toaster.showWarningMessage('Please save editable user or cancel editing');
      return;
    }

    const user = {...initialUser};
    user.role = RoleEnum.ADMIN;
    user.editable = true;
    this.formPatchValue(user);
    this.users.unshift(user);
    this.dataSource = new MatTableDataSource(this.users);
  }

  editUser(user: UserInfo): void {
    if (this.isCurrentlyEditable()) {
      this._toaster.showWarningMessage('Please save editable user or cancel editing');
      return;
    }

    this.formPatchValue(user);
    user.editable = true;
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this._toaster.showErrorMessage('Please fill all required fields');
      return;
    }

    const user: UserInfo = {...this.userForm.value};
    user._id ? this.updateUser(user) : this.createUser(user);

  }

  createUser(user: UserInfo): void {
    this._adminService.createUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('User created successfully');
        this.getUsers();
      });
  }

  updateUser(user: UserInfo): void {
    const {_id} = user;
    delete user._id;
    this._adminService.updateUser(_id, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('User updated successfully');
        this.getUsers();
      })
  }

  cancelEditing(): void {
    this.getUsers();
  }

  isCurrentlyEditable(): boolean {
    return this.dataSource.data.some(user => user.editable);
  }

  openDeleteUserDialog(user: UserInfo): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete user',
        message: `Are you sure you want to delete user ${user.firstName} ${user.lastName}?`
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.deleteUser(user._id);
      });
  }

  deleteUser(id: string): void {
    this._adminService.deleteUser(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('User deleted successfully');
        this.getUsers();
      })
  }

}
