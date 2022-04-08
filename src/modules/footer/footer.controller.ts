import { Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { hasRoles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { MultipleImageUrlsInterceptor } from 'src/common/interceptors/multiple-image-urls.interceptor';
import { ICommonQuery } from 'src/common/interfaces/common-query';
import { IMulterRequest } from 'src/common/interfaces/multer-custom';
import { storageUtil } from 'src/common/utils/storage.util';
import { FooterService } from './footer.service';
import { Partner } from './schemas/partner.schema';
import * as multerGoogleStorage from 'multer-google-storage';
import { PartnerDto } from './dto/partner.dto';

const FOOTER_FOLDER = 'footer';

@Controller('footer')
export class FooterController {
    constructor(private readonly footerService: FooterService){}

    @Get()
    @UseInterceptors(new MultipleImageUrlsInterceptor(300))
    getPartners(@Query() query: ICommonQuery): Promise<Partner[]> {
        return this.footerService.getPartners(+query.year);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('images', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions(FOOTER_FOLDER))
    }))
    addPartners(
        @Query() query: ICommonQuery,
        @Req() req: IMulterRequest): Promise<any> {
        const index = FOOTER_FOLDER.length + 20; // 2 * slash + year.length + timestamp length
        const modifiedDtos = req.files.map((item: any) => {
            const fileDto: PartnerDto = {
                title: item.filename.slice(index),
                imageUrl: item.path,
                archiveYear: +query.year
            };

            return fileDto;
        })

        return this.footerService.addPartners(modifiedDtos);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Delete(':id')
    async deletePartner(@Param('id') id: string): Promise<Partner> {
        const itemForDelete = await this.footerService.getPartnerImageUrl(id);
        await storageUtil.removeFile(itemForDelete.imageUrl);
        return this.footerService.deletePartner(id);
    }
}
