import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramDto } from './dto/program.dto';
import { Program } from './schemas/program.schema';

@Controller('program')
export class ProgramController {
    constructor(private readonly programService: ProgramService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createProgramEvent(@Body() programDto: ProgramDto): Promise<Program> {
        return this.programService.addProgramEvent(programDto);
    }
}
