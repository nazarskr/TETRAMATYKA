import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserCredentialDocument = UserCredential & Document;

@Schema()
export class UserCredential {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    isRegistered: string;
}

export const UserCredentialSchema = SchemaFactory.createForClass(UserCredential);
