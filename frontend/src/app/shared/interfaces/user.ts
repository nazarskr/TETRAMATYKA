import { RoleEnum } from '../enums/role';

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
  _id?: string;
  editable?: boolean;
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

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserRegisterGoogle {
  firstName: string;
  lastName: string;
  email: string;
}

