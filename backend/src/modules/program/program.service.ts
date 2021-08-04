import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramItem, ProgramItemDocument } from './schemas/program.schema';
import { ProgramItemDto } from './dto/program.dto';

@Injectable()
export class ProgramService {
    constructor(@InjectModel(ProgramItem.name) private programModel: Model<ProgramItemDocument>) {
    }

    async getAllProgramItems(currentYear: number): Promise<ProgramItem[]> {
        return this.programModel.find({archiveYear: currentYear});
    }

    async addProgramItem(programItemDto: ProgramItemDto): Promise<ProgramItem> {
        const newProgramItem = new this.programModel(programItemDto);
        return newProgramItem.save();
    }

    async updateProgramItem(id: string, programItemDto: ProgramItemDto): Promise<ProgramItem> {
        return this.programModel.findByIdAndUpdate(id, programItemDto, {new: false});
    }

    async removeProgramItem(id: string): Promise<ProgramItem> {
        return this.programModel.findByIdAndRemove(id);
    }
}
