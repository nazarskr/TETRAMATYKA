import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { MailService } from "../mail/mail.service";
import { InjectModel } from "@nestjs/mongoose";
import { UserCredential, UserCredentialDocument } from "../users/schemas/user-credential.schema";
import { Model } from "mongoose";
import { of } from "rxjs";
import { UserLoginDto, UpdatePasswordDto, UserRegisterDto } from "./dto/user.dtos";
import { JwtService } from "@nestjs/jwt";
import { Role } from "../../common/enums/role.enum";
import { VerificationTokenPayload } from "../../common/interfaces/verification-token-payload";
import { ConfigService } from "@nestjs/config";
import { User, UserDocument } from "../users/schemas/user.schema";

const bcrypt = require ('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserCredential.name) private userCredentialModel: Model<UserCredentialDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private usersService: UsersService,
        private mailService: MailService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async login(userLoginDto: UserLoginDto) {
        const user = await this.usersService.getUserCredentialByEmail(userLoginDto.email);

        if (!user) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'Wrong email',
            }, HttpStatus.FORBIDDEN);
        }

        const isPasswordTheSame = await this.comparePasswords(userLoginDto.email, user.password);
        if (isPasswordTheSame) {
            const token = this.generateJwt({email: userLoginDto.email});
            return of(token);
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'Wrong password',
            }, HttpStatus.FORBIDDEN);
        }
    }

    async register(userRegisterDto: UserRegisterDto) {
        const user = await this.usersService.getUserCredentialByEmail(userRegisterDto.email);
        if (user) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'This email registered yet',
            }, HttpStatus.FORBIDDEN);
        }

        const hashedPass = await this.hashPassword(userRegisterDto.password);

        const userInfo = {
            email: userRegisterDto.email,
            firstName: userRegisterDto.firstName,
            lastName: userRegisterDto.lastName,
            role: Role.USER
        };

        const userCredential = {
            email: userRegisterDto.email,
            password: hashedPass
        }

        const newUser = await new this.userModel(userInfo);
        const newUserCredential = await new this.userCredentialModel(userCredential);
        await newUser.save();
        await newUserCredential.save();
        return newUserCredential;
    }

    async updatePassword(token: string, updatePasswordDto: UpdatePasswordDto) {
        const email: string = await this.jwtService.decode(token)['email'];
        const user = await this.userCredentialModel.find({email});
        const newPassword = await this.hashPassword(updatePasswordDto.password);
        return this.userCredentialModel.findByIdAndUpdate(user['_id'], {password: newPassword}, {new: true});
    }

    async sendResetPassword(email: string) {
        const user = await this.userCredentialModel.find({email});
        if (user) {
            await this.mailService.sendResetPasswordEmail(email);
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This email is not registered yet',
            }, HttpStatus.FORBIDDEN);
        }
    }

    generateJwt(payload: VerificationTokenPayload): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_AUTH_TOKEN_EXPIRATION_TIME')}s`
        });
    }

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    comparePasswords(password: string, storedPasswordHash: string): Promise<any> {
        return bcrypt.compare(password, storedPasswordHash);
    }
}
