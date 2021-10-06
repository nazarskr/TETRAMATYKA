import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from './schemas/user.schema';
import { UserCredential, UserCredentialSchema } from "./schemas/user-credential.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: UserCredential.name, schema: UserCredentialSchema }], 'master')
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
