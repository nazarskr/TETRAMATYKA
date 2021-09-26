import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local-strategy";
import { MailService } from "../mail/mail.service";
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/schemas/user.schema";

@Module({
  imports: [
      PassportModule,
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'master'),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, MailService],
})
export class AuthModule {}
