import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramItemDto } from './dto/program.dto';
import { ProgramItem } from './schemas/program.schema';
import { ICommonQuery } from '../../common/interfaces/common-query';
import {hasRoles} from "../../common/decorators/roles.decorator";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesGuard} from "../../common/guards/roles.guard";

@Controller('program')
export class ProgramController {
    constructor(private readonly programService: ProgramService) {
    }

    @Get()
    getAllProgramItems(@Query() query: ICommonQuery): Promise<ProgramItem[]> {
        return this.programService.getAllProgramItems(+query.year);
    }

    // @hasRoles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    addProgramItem(@Query() query: ICommonQuery, @Body() programItemDto: ProgramItemDto): Promise<ProgramItem> {
        programItemDto.archiveYear = +query.year;
        return this.programService.addProgramItem(programItemDto);
    }

    // @hasRoles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateProgramItem(@Param('id') id: string, @Body() programItemDto: ProgramItemDto): Promise<ProgramItem> {
        return this.programService.updateProgramItem(id, programItemDto);
    }

    // @hasRoles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    removeProgramItem(@Param('id') id: string): Promise<ProgramItem> {
        return this.programService.removeProgramItem(id);
    }
}
