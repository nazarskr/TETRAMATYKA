import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { MultiLanguage } from "../../../common/schemas/multi-language.schema";

export type NewsItemDocument = NewsItem & Document;

@Schema()
export class NewsItem {
    @Prop({ required: true, type: MultiLanguage })
    title: MultiLanguage;

    @Prop({ required: true, type: MultiLanguage })
    description: MultiLanguage;

    @Prop()
    imageUrl: string;

    @Prop()
    eventDate: Date;

    @Prop({required: true})
    archiveYear: number;
}

export const NewsItemSchema = SchemaFactory.createForClass(NewsItem);
