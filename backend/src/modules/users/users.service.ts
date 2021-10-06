import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from './schemas/user.schema';
import { Model } from "mongoose";
import { UserInfoDto } from "./dto/user-info.dto";
import { MailService } from "../mail/mail.service";
import { UserCredential, UserCredentialDocument } from "./schemas/user-credential.schema";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(UserCredential.name) private userCredentialModel: Model<UserCredentialDocument>,
        private mailService: MailService
    ) {
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    async createUser(userInfoDto: UserInfoDto): Promise<User> {
        const newUser = await new this.userModel(userInfoDto);
        await newUser.save();
        await this.mailService.sendRegistrationEmail(userInfoDto);
        return newUser;
    }

    async updateUser(id: string, userInfoDto: UserInfoDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userInfoDto, {new: false});
    }

    async deleteUser(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id);
    }

    async resendMail() {
        // TODO resend registration mail
    }

    async getUser(email: string): Promise<UserCredential> {
        return this.userCredentialModel.findOne({email});
    }
}
