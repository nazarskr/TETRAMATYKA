import { Module } from '@nestjs/common';
import { RolesGuard } from "./guards/roles.guard";
import { JWTUtil } from "./utils/jwtUtil";
import { GoogleStrategy } from "./strategies/google-strategy";
import { JwtStrategy } from "./strategies/jwt-strategy";
import { UsersService } from "../modules/users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../modules/users/schemas/user.schema";
import { UserCredential, UserCredentialSchema } from "../modules/users/schemas/user-credential.schema";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserCredential.name, schema: UserCredentialSchema }], 'master'),
        JwtModule.register({
            secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
            signOptions: { expiresIn: `${process.env.JWT_AUTH_TOKEN_EXPIRATION_TIME}s` },
        }),
    ],
    providers: [JWTUtil, RolesGuard, JwtStrategy, GoogleStrategy, UsersService],
    exports: [JWTUtil, RolesGuard, JwtStrategy, GoogleStrategy, UsersService]
})
export class CommonModule {}
