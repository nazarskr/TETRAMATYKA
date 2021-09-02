import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MultiLanguage } from '../../../common/schemas/multi-language.schema';
import { Participant } from '../../participants/schemas/participant.schema';
import { IParticipant } from '../../../common/interfaces/participant';

export type WorksItemDocument = WorksItem & Document;

@Schema()
export class WorksItem {
    // @Prop({type: Types.ObjectId})
    // _id: Types.ObjectId;

    @Prop({ required: true, type: MultiLanguage })
    title: MultiLanguage;

    @Prop({ required: true, type: MultiLanguage })
    description: MultiLanguage;

    @Prop({type: [Types.ObjectId], ref: 'Participant'})
    participant: IParticipant[];

    @Prop()
    imageUrl: string;

    @Prop({required: true})
    archiveYear: number;
}

export const WorksItemSchema = SchemaFactory.createForClass(WorksItem);
