import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MultiLanguage } from '../../../common/schemas/multi-language.schema';
import { IWorksItem } from '../../../common/interfaces/works-item';
import { WorksItem } from '../../works/schemas/work.schema';


export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
    @Prop({type: Types.ObjectId})
    _id: Types.ObjectId;

    @Prop({ required: true , type: MultiLanguage})
    fullName: MultiLanguage;

    @Prop({ required: true, type: MultiLanguage})
    bio: MultiLanguage;

    @Prop({type: [Types.ObjectId], ref: 'WorksItem'})
    works: IWorksItem[];

    @Prop()
    imageUrl: string;

    @Prop({required: true})
    archiveYear: number;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
