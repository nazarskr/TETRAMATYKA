import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { VerificationTokenPayload } from "../../common/interfaces/verification-token-payload";

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async sendRegistrationEmail(user: User) {
        const {email, firstName, lastName} = user;
        const payload: VerificationTokenPayload = { email };
        const token = this.signTokenForEmail(payload);
        const url = `${process.env.HOST}/auth/register/${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Tetramatyka registration',
            template: './register.mail.hbs',
            context: {
                name: `${firstName} ${lastName}`,
                url,
            },
        });
    }

    async sendResetPasswordEmail(email: string) {
        const payload: VerificationTokenPayload = { email };
        const token = this.signTokenForEmail(payload);
        const url = `${process.env.HOST}/auth/reset-password/${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Tetramatyka reset password',
            template: './reset-password.mail.hbs',
            context: {
                name: `dear User`,
                url,
            },
        });
    }

    signTokenForEmail(payload: VerificationTokenPayload): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
        });
    }
}
