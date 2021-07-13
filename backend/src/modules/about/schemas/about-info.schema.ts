import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutInfoDocument = AboutInfo & Document;

@Schema()
export class AboutInfo {
    @Prop({ required: true })
    textUA: string;

    @Prop({ required: true })
    textEN: string;

    @Prop()
    imageUrl: string;
}

export const AboutInfoSchema = SchemaFactory.createForClass(AboutInfo);
