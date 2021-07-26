import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MultiLanguage } from '../../../../../frontend/src/app/shared/interfaces/common';

export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
    @Prop({ required: true })
    fullName: MultiLanguage;

    @Prop({ required: true })
    bio: MultiLanguage;

    @Prop()
    imageUrl: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
