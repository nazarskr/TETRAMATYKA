import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryImageDocument = GalleryImage & Document;

@Schema()
export class GalleryImage {
    @Prop()
    title: string;

    @Prop()
    imageUrl: string;

    @Prop({required: true})
    archiveYear: number;

    @Prop({required: true})
    chapter: string;
}

export const GalleryImageSchema = SchemaFactory.createForClass(GalleryImage);
