import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramItem, ProgramDocument } from './schemas/program.schema';
import { ProgramDto } from './dto/program.dto';

@Injectable()
export class ProgramService {
    constructor(@InjectModel(ProgramItem.name) private programModel: Model<ProgramDocument>) {
    }

    async getAllProgramItems(currentYear: number): Promise<ProgramItem[]> {
        return this.programModel.find({archiveYear: currentYear});
    }

    async addProgramItem(programDto: ProgramDto): Promise<ProgramItem> {
        const newProgramEvent = new this.programModel(programDto);
        return newProgramEvent.save();
    }

    async updateProgramItem(id: string, programDto: ProgramDto): Promise<ProgramItem> {
        return this.programModel.findByIdAndUpdate(id, programDto, {new: false});
    }

    async removeProgramItem(id: string): Promise<ProgramItem> {
        return this.programModel.findByIdAndRemove(id);
    }
}
