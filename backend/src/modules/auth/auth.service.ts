import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { UsersService } from "../users/users.service";
import {MailService} from "../mail/mail.service";
import {InjectModel} from "@nestjs/mongoose";
import {UserCredential, UserCredentialDocument} from "../users/schemas/user-credential.schema";
import {Model} from "mongoose";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserCredential.name) private userCredentialModel: Model<UserCredentialDocument>,
        private usersService: UsersService,
        private mailService: MailService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async resetPassword(email: string): Promise<void> {
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
}
