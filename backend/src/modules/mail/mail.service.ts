import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {User} from "../users/schemas/user.schema";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    // TODO specify user type
    async sendUserRegistration(user: User, token: string) {
        const url = `http://tetramatyka.org.ua/auth/register?token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Tetramatyka registration',
            template: './register.mail',
            context: {
                name: user.fullName,
                url,
            },
        });
    }
}
