import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MultiLanguage } from "../../../common/schemas/multi-language.schema";

export type GalleryChapterDocument = GalleryChapter & Document;

@Schema()
export class GalleryChapter {
    @Prop({required: true, type: MultiLanguage})
    title: MultiLanguage;

    @Prop({required: true})
    imageUrl: string;

    @Prop({required: true})
    archiveYear: number;
}

export const GalleryChapterSchema = SchemaFactory.createForClass(GalleryChapter);