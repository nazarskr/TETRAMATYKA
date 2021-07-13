import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ArchiveManagerService } from './archive-manager.service';
import { ArchiveYear } from "./schemas/archive-year.schema";
import { ArchiveYearDto } from "./dto/archive-year.dto";

@Controller("archive-manager")
export class ArchiveManagerController {
    constructor(private readonly archiveManagerService: ArchiveManagerService) {
    }

    @Get()
    getAll(): Promise<ArchiveYear[]> {
        return this.archiveManagerService.getAllArchiveYears();
    }

    @Get('current')
    getCurrent(): Promise<ArchiveYear> {
        return this.archiveManagerService.getCurrentYear();
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<ArchiveYear> {
        return this.archiveManagerService.getArchiveYearById(id);
    }

    @Patch()
    update(@Body() archiveYears: ArchiveYearDto[]) {
        return this.archiveManagerService.updateArchiveYears(archiveYears);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<ArchiveYear> {
        return this.archiveManagerService.removeArchiveYear(id);
    }
}
