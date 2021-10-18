import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MultiLanguage } from '../../../common/schemas/multi-language.schema';

export type AboutInfoDocument = AboutInfo & Document;

@Schema()
export class AboutInfo {
    @Prop({ required: true, type: MultiLanguage })
    text: MultiLanguage;

    @Prop()
    imageUrl: string;

    @Prop({required: true})
    archiveYear: number;
}

export const AboutInfoSchema = SchemaFactory.createForClass(AboutInfo);
