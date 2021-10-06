import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  imports: [
      MailerModule.forRootAsync({
        useFactory: async (config: ConfigService) => ({
          transport: {
            service: config.get('MAIL_SERVICE'),
            host: config.get('MAIL_HOST'),
            secure: false,
            port: 587,
            requireTLS: true,
            auth: {
              user: config.get('MAIL_USER'),
              pass: config.get('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `"No Reply" <${config.get('MAIL_FROM')}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }),
        inject: [ConfigService],
      }),
      JwtModule.register({
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
        signOptions: { expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s` },
      })
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

