import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MultiLanguageDocument = MultiLanguage & Document;

@Schema()
export class MultiLanguage {
    @Prop({ required: true })
    ua: string;

    @Prop({ required: true })
    en: string;
}

export const MultiLanguageSchema = SchemaFactory.createForClass(MultiLanguage);
