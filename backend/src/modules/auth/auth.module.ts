import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport";
import { MailService } from "../mail/mail.service";
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserCredential, UserCredentialSchema } from "../users/schemas/user-credential.schema";
import { User, UserSchema } from "../users/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
      PassportModule,
      JwtModule.register({
          secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
          signOptions: { expiresIn: `${process.env.JWT_AUTH_TOKEN_EXPIRATION_TIME}s` },
      }),
      MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: UserCredential.name, schema: UserCredentialSchema }], 'master'),
  ],
  controllers: [AuthController],
  providers: [ AuthService, UsersService, MailService ],
})
export class AuthModule {}
