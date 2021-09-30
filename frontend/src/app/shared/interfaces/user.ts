import { RoleEnum } from '../enums/role';

export interface UserInfo {
  email: string;
  fullName: string;
  role: RoleEnum;
}

export interface UserCredential {
  email: string;
  password: string;
}

export interface UserChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

