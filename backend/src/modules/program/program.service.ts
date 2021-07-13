import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Program, ProgramDocument } from './schemas/program.schema';
import { ProgramDto } from './dto/program.dto';

@Injectable()
export class ProgramService {
    constructor(@InjectModel(Program.name) private programModel: Model<ProgramDocument>) {
    }

    async addProgramEvent(programDto: ProgramDto): Promise<Program> {
        const newProgramEvent = new this.programModel(programDto);
        return newProgramEvent.save();
    }
}
