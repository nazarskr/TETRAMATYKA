import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type PartnerDocument = Partner & Document;

@Schema()
export class Partner {
    @Prop()
    title: string;

    @Prop({required: true})
    imageUrl: string;

    @Prop({required: true})
    archiveYear: number;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);