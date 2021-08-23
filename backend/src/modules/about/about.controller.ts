import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors, Req} from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutInfo } from './schemas/about-info.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ICommonQuery } from '../../common/interfaces/common-query';
import { AboutInfoDto } from './dto/about-info.dto';
import * as multerGoogleStorage from 'multer-google-storage';
import { createMulterOptions } from "../../common/config/multer.config";
import { storageUtil } from '../../common/utils/storage.util';

@Controller('about')
export class AboutController {

    constructor (private readonly aboutService: AboutService) {
    }

    @Get()
    getAboutInfo(@Query() query: ICommonQuery): Promise<AboutInfo[]> {
        return this.aboutService.getAboutInfo(+query.year);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(createMulterOptions('about'))
    }))
    async addAboutInfo(
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req
    ): Promise<AboutInfo> {
        const aboutInfo: AboutInfoDto = JSON.parse(body.aboutInfo);
        aboutInfo.archiveYear = +query.year;
        aboutInfo.imageUrl = req.files[0].path;
        return this.aboutService.addAboutInfo(aboutInfo);
    }

    @Put(':id')
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(createMulterOptions('about'))
    }))
    async updateAboutInfo(
        @Param('id') id: string,
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req
    ): Promise<AboutInfo> {
        const aboutInfo: AboutInfoDto = JSON.parse(body.aboutInfo);
        const previousUrl = aboutInfo.imageUrl;
        await storageUtil.removeFile('about', previousUrl);
        aboutInfo.imageUrl = req.files[0].path;
        return this.aboutService.updateAboutInfo(id, aboutInfo);
    }

    @Delete(':id')
    removeAboutInfo(@Param('id') id: string): Promise<AboutInfo> {
        return this.aboutService.removeAboutInfo(id);
    }
}
