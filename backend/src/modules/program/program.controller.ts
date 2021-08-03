import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramDto } from './dto/program.dto';
import { ProgramItem } from './schemas/program.schema';
import { ICommonQuery } from '../../common/interfaces/common-query';

@Controller('program')
export class ProgramController {
    constructor(private readonly programService: ProgramService) {
    }

    @Get()
    getAllProgramItems(@Query() query: ICommonQuery): Promise<ProgramItem[]> {
        return this.programService.getAllProgramItems(+query.year);
    }

    @Post()
    addProgramItem(@Query() query: ICommonQuery, @Body() programDto: ProgramDto): Promise<ProgramItem> {
        programDto.archiveYear = +query.year;
        return this.programService.addProgramItem(programDto);
    }

    @Put(':id')
    updateProgramItem(@Param('id') id: string, @Body() programDto: ProgramDto): Promise<ProgramItem> {
        return this.programService.updateProgramItem(id, programDto);
    }

    @Delete(':id')
    removeProgramItem(@Param('id') id: string): Promise<ProgramItem> {
        return this.programService.removeProgramItem(id);
    }
}
