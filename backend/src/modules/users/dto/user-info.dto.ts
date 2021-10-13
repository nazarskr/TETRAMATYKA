import { Role } from "../../../common/enums/role.enum";

export class UserInfoDto {
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}
