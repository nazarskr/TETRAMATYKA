import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MultiLanguage } from '../../../common/schemas/multi-language.schema';


export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
    @Prop({ required: true , type: MultiLanguage})
    fullName: MultiLanguage;

    @Prop({ required: true, type: MultiLanguage})
    bio: MultiLanguage;

    @Prop()
    imageUrl: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
