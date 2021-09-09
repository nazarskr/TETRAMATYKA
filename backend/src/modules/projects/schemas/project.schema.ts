import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { MultiLanguage } from "../../../common/schemas/multi-language.schema";

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop({ required: true, type: MultiLanguage })
    title: MultiLanguage;

    @Prop({ required: true, type: MultiLanguage })
    description: MultiLanguage;

    @Prop()
    imageUrl: string;

    @Prop({required: true})
    archiveYear: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
