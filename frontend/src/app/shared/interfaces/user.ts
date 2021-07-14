import { RoleEnum } from '../enums/role';

export interface UserInfo {
  email: string;
  fullName: string;
  role: RoleEnum;
}
