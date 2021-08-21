import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutInfo } from './schemas/about-info.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ICommonQuery } from '../../common/interfaces/common-query';
import { AboutInfoDto } from './dto/about-info.dto';
import MulterGoogleStorage from 'multer-google-storage';
import { createMulterOptions } from "../../common/config/multer.config";

@Controller('about')
export class AboutController {
    public folderName = 'https://storage.googleapis.com/tetramatyka/about';

    constructor (private readonly aboutService: AboutService) {
    }

    @Get()
    getAboutInfo(@Query() query: ICommonQuery): Promise<AboutInfo[]> {
        return this.aboutService.getAboutInfo(+query.year);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: new MulterGoogleStorage(createMulterOptions('about'))
    }))
    async addAboutInfo(
        @Query() query: ICommonQuery,
        @UploadedFile() image: Express.Multer.File,
        @Body() body: any
    ): Promise<AboutInfo> {
        console.log(image);
        const aboutInfo: AboutInfoDto = JSON.parse(body.aboutInfo);
        aboutInfo.archiveYear = +query.year;
        return this.aboutService.addAboutInfo(aboutInfo);
    }

    @Put(':id')
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: new MulterGoogleStorage(createMulterOptions('about'))
    }))
    async updateAboutInfo(
        @Param('id') id: string,
        @Query() query: ICommonQuery,
        @UploadedFile() image: Express.Multer.File,
        @Body() body: any
    ): Promise<AboutInfo> {
        console.log(image);
        const aboutInfo: AboutInfoDto = JSON.parse(body.aboutInfo);
        return this.aboutService.updateAboutInfo(id, aboutInfo);
    }

    @Delete(':id')
    removeAboutInfo(@Param('id') id: string): Promise<AboutInfo> {
        return this.aboutService.removeAboutInfo(id);
    }
}
