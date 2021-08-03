import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {MultiLanguage} from '../../../common/schemas/multi-language.schema';

export type ProgramDocument = ProgramItem & Document;

@Schema()
export class ProgramItem {
    @Prop({ required: true, type: MultiLanguage })
    title: MultiLanguage;

    @Prop({ required: true, type: MultiLanguage })
    info: MultiLanguage;

    @Prop({ required: true })
    eventFullDate: Date;

    @Prop({required: true})
    archiveYear: number;
}

export const ProgramSchema = SchemaFactory.createForClass(ProgramItem);
