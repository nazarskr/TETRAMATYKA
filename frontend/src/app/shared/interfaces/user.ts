import { RoleEnum } from '../enums/role';

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
}

export interface UserCredential {
  email: string;
  password: string;
}

export interface UserChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

