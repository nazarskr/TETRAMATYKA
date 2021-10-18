import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MultiLanguage } from '../../../common/schemas/multi-language.schema';

export type ContactItemDocument = ContactItem & Document;

@Schema()
export class ContactItem {
    @Prop({required: true, type: MultiLanguage})
    title: MultiLanguage;

    @Prop({required: true})
    email: string;

    @Prop()
    phone: string;

    @Prop({required: true})
    positionIndex: number;
}

export const ContactItemSchema = SchemaFactory.createForClass(ContactItem);
