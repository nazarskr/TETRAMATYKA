import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArchiveYearDocument = ArchiveYear & Document;

@Schema()
export class ArchiveYear {
    @Prop({ required: true })
    year: number;

    @Prop({ required: true })
    available: boolean;

    @Prop({ required: true })
    current: boolean;
}

export const ArchiveYearSchema = SchemaFactory.createForClass(ArchiveYear);
