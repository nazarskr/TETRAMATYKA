import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, UpdateWriteOpResult} from 'mongoose';
import { Participant, ParticipantDocument } from './schemas/participant.schema';
import { ParticipantDto } from './dto/participant.dto';
import { WorksItem, WorksItemDocument } from '../works/schemas/work.schema';
import {from, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable()
export class ParticipantsService {
    constructor(
        @InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>,
        @InjectModel(WorksItem.name) private worksModel: Model<WorksItemDocument>,
    ) {}

    async getAllParticipants(year: number): Promise<Participant[]> {
        return this.participantModel.find({archiveYear: year});
    }

    async getAllParticipantsShort(year: number): Promise<Participant[]> {
        return this.participantModel.find({archiveYear: year}, {bio: 0, imageUrl: 0});
    }

    async getParticipantsForWorksItem(participantIds: string[]): Promise<Participant[]> {
        return this.participantModel.find({_id: {$in: participantIds}});
    }

    async getParticipantById(id: string): Promise<Participant> {
        return this.participantModel.findById(id);
    }

    async createParticipant(participantDto: ParticipantDto): Promise<WorksItemDocument> {
        const worksItemId = participantDto.works[0];
        const newParticipant = new this.participantModel(participantDto);
        const savedParticipant = await newParticipant.save();
        const {_id} = savedParticipant;
        return this.worksModel.findByIdAndUpdate(worksItemId, { $push: { participants: _id } });
    }

    async updateParticipant(id: string, participantDto: ParticipantDto): Promise<Participant> {
        return this.participantModel.findByIdAndUpdate(id, participantDto, {new: false});
    }

    deleteParticipant(id: string): Observable<UpdateWriteOpResult> {
        return from(this.participantModel.findByIdAndRemove(id))
            .pipe(
                switchMap(() => {
                    return this.worksModel.updateMany({}, {$pull: {participants: id}});
                })
            );
    }

    async getParticipantImageUrl(id: string): Promise<Participant> {
        return this.participantModel.findById(id).select('imageUrl');
    }
}
