import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GalleryChaptersEnum } from './gallery.enum';

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
    chapter: GalleryChaptersEnum;
}

export const GallerySchema = SchemaFactory.createForClass(GalleryImage)
