import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MultiLanguage } from '../../../common/schemas/multi-language.schema';

export type ProgramItemDocument = ProgramItem & Document;

@Schema()
export class ProgramItem {
    @Prop({ required: true, type: MultiLanguage })
    title: MultiLanguage;

    @Prop({ required: true, type: MultiLanguage })
    info: MultiLanguage;

    @Prop({ required: true })
    eventStartDate: Date;

    @Prop()
    eventEndDate: Date;

    @Prop({required: true})
    archiveYear: number;
}

export const ProgramItemSchema = SchemaFactory.createForClass(ProgramItem);
