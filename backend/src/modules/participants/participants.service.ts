import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant, ParticipantDocument } from './schemas/participant.schema';
import { ParticipantDto } from './dto/participant.dto';

@Injectable()
export class ParticipantsService {
    constructor(@InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>) {
    }

    async getAllParticipants(year: number): Promise<Participant[]> {
        return this.participantModel.find({archiveYear: year}, {bio: 0, imageUrl: 0});
    }

    async getParticipantById(id: string): Promise<Participant> {
        return this.participantModel.findById(id);
    }

    async createParticipant(participantDto: ParticipantDto): Promise<Participant> {
        const newParticipant = new this.participantModel(participantDto);
        return newParticipant.save();
    }

    async updateParticipant(id: string, participantDto: ParticipantDto): Promise<Participant> {
        return this.participantModel.findByIdAndUpdate(id, participantDto, {new: false});
    }

    async deleteParticipant(id: string): Promise<Participant> {
        return this.participantModel.findByIdAndRemove(id);
    }
}
