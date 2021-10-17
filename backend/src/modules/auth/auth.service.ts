import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { MailService } from "../mail/mail.service";
import { InjectModel } from "@nestjs/mongoose";
import { UserCredential, UserCredentialDocument } from "../users/schemas/user-credential.schema";
import { Model } from "mongoose";
import {
    UserLoginDto,
    UpdatePasswordDto,
    UserRegisterDto,
    UserRegisterGoogleDto,
    UserChangePasswordDto
} from "./dto/user.dtos";
import { JwtService } from "@nestjs/jwt";
import { Role } from "../../common/enums/role.enum";
import { VerificationTokenPayload } from "../../common/interfaces/verification-token-payload";
import { ConfigService } from "@nestjs/config";
import { User, UserDocument } from "../users/schemas/user.schema";
import {TokenRes} from "../../common/interfaces/token-res";

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

    async login(userLoginDto: UserLoginDto): Promise<TokenRes> {
        const user = await this.usersService.getUserCredentialByEmail(userLoginDto.email);

        if (!user) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'Wrong email',
            }, HttpStatus.FORBIDDEN);
        }

        const isPasswordTheSame = await this.comparePasswords(userLoginDto.email, user.password);
        if (isPasswordTheSame) {
            return {
                token: this.generateJwt({email: userLoginDto.email})
            };
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

    async registerGoogleUser(userRegisterGoogleDto: UserRegisterGoogleDto): Promise<TokenRes> {
        const user = await this.usersService.getUserCredentialByEmail(userRegisterGoogleDto.email);
        if (user) {
            return {
                token: this.generateJwt({email: user.email})
            };
        } else {
            const userInfo = {
                email: userRegisterGoogleDto.email,
                firstName: userRegisterGoogleDto.firstName,
                lastName: userRegisterGoogleDto.lastName,
                role: Role.USER
            };

            const userCredential = {
                email: userRegisterGoogleDto.email,
                password: ''
            }

            const newUser = await new this.userModel(userInfo);
            const newUserCredential = await new this.userCredentialModel(userCredential);
            await newUser.save();
            await newUserCredential.save();
            const payload = {email: userRegisterGoogleDto.email};
            return {
                token: this.generateJwt(payload)
            }
        }
    }

    async changeUserPassword(id: string, body: UserChangePasswordDto): Promise<UserCredential> {
        const password = await this.hashPassword(body.newPassword);
        return this.userCredentialModel.findByIdAndUpdate(id, {password},{new: false})
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

    // TODO login via BE
    // async validateOAuthLogin(email: string): Promise<string> {
    //     try {
    //         const user = await this.usersService.getUserCredentialByEmail(email);
    //         if (!user) {
    //
    //         }
    //
    //         const userRegister: any = {
    //             email,
    //             firstName: '',
    //             lastName: ''
    //         };
    //
    //         const userInfo = {
    //             email: userRegister.email,
    //             firstName: userRegister.firstName,
    //             lastName: userRegister.lastName,
    //             role: Role.USER
    //         };
    //
    //         const userCredential = {
    //             email: userRegister.email,
    //             password: ''
    //         }
    //
    //         const newUser = await new this.userModel(userInfo);
    //         const newUserCredential = await new this.userCredentialModel(userCredential);
    //         await newUser.save();
    //         await newUserCredential.save();
    //
    //         const payload = {
    //             email //extract email
    //         }
    //
    //         const token: string = this.jwtService.sign(payload, {
    //             secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
    //             expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
    //         });
    //         return token;
    //     }
    //     catch (err) {
    //         throw new HttpException({
    //             status: HttpStatus.FORBIDDEN,
    //             error: 'Invalid credentials',
    //         }, HttpStatus.FORBIDDEN);
    //     }
    // }
}
