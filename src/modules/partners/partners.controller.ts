import { Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { hasRoles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { MultipleImageUrlsInterceptor } from 'src/common/interceptors/multiple-image-urls.interceptor';
import { ICommonQuery } from 'src/common/interfaces/common-query';
import { IMulterRequest } from 'src/common/interfaces/multer-custom';
import { storageUtil } from 'src/common/utils/storage.util';
import { PartnersService } from './partners.service';
import { Partner } from './schemas/partner.schema';
import * as multerGoogleStorage from 'multer-google-storage';
import { PartnerDto } from './dto/partner.dto';

const PARTNERS = 'partners';

@Controller(PARTNERS)
export class PartnersController {
    constructor(private readonly partnersService: PartnersService){}

    @Get()
    @UseInterceptors(new MultipleImageUrlsInterceptor(300))
    getPartners(@Query() query: ICommonQuery): Promise<Partner[]> {
        return this.partnersService.getPartners(+query.year);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('images', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions(PARTNERS))
    }))
    addPartners(
        @Query() query: ICommonQuery,
        @Req() req: IMulterRequest): Promise<any> {
        const index = PARTNERS.length + 20; // 2 * slash + year.length + timestamp length
        const modifiedDtos = req.files.map((item: any) => {
            const fileDto: PartnerDto = {
                title: item.filename.slice(index),
                imageUrl: item.path,
                archiveYear: +query.year
            };

            return fileDto;
        })

        return this.partnersService.addPartners(modifiedDtos);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Delete(':id')
    async deletePartner(@Param('id') id: string): Promise<Partner> {
        const itemForDelete = await this.partnersService.getPartnerImageUrl(id);
        await storageUtil.removeFile(itemForDelete.imageUrl);
        return this.partnersService.deletePartner(id);
    }
}
