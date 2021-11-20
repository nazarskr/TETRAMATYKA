import {Body, Controller, Delete, Get, Param, Patch, UseGuards} from '@nestjs/common';
import { ArchiveManagerService } from './archive-manager.service';
import { ArchiveYear } from "./schemas/archive-year.schema";
import { ArchiveYearDto } from "./dto/archive-year.dto";
import { hasRoles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";


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

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Patch()
    update(@Body() archiveYears: ArchiveYearDto[]) {
        return this.archiveManagerService.updateArchiveYears(archiveYears);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<ArchiveYear> {
        return this.archiveManagerService.removeArchiveYear(id);
    }
}
