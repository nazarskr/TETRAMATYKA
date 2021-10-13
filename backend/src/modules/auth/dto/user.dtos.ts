export class UserLoginDto {
    email: string;
    password: string;
}

export interface UserRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UpdatePasswordDto {
    password: string;
    confirmPassword: string;
}

export interface UserChangePasswordDto {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

