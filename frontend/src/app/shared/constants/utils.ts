import { ArchiveYear } from "@shared/interfaces/admin";
import { UserInfo } from "@shared/interfaces/user";
import {RoleEnum} from "@shared/enums/role";

export const initialYear: ArchiveYear = {
  year: 2021,
  available: true,
  current: true
}

export const initialUser: UserInfo = {
  email: '',
  firstName: '',
  lastName: '',
  role: RoleEnum.GUEST
}
