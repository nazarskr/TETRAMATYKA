import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors, Req, UseGuards} from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutInfo } from './schemas/about-info.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ICommonQuery } from '../../common/interfaces/common-query';
import { IMulterRequest } from '../../common/interfaces/multer-custom';
import { AboutInfoDto } from './dto/about-info.dto';
import * as multerGoogleStorage from 'multer-google-storage';
import { storageUtil } from '../../common/utils/storage.util';
import {hasRoles} from "../../common/decorators/roles.decorator";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesGuard} from "../../common/guards/roles.guard";

@Controller('about')
export class AboutController {

    constructor (private readonly aboutService: AboutService) {
    }

    @Get()
    getAboutInfo(@Query() query: ICommonQuery): Promise<AboutInfo[]> {
        return this.aboutService.getAboutInfo(+query.year);
    }

    @hasRoles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('about'))
    }))
    addAboutInfo(
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<AboutInfo> {
        const aboutInfo: AboutInfoDto = JSON.parse(body.aboutInfo);
        aboutInfo.archiveYear = +query.year;
        aboutInfo.imageUrl = req.files[0].path;
        return this.aboutService.addAboutInfo(aboutInfo);
    }

    @hasRoles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('about'))
    }))
    async updateAboutInfo(
        @Param('id') id: string,
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<AboutInfo> {
        const aboutInfo: AboutInfoDto = JSON.parse(body.aboutInfo);
        if (req.files.length) {
            await this.aboutService.getAboutImageUrl(id)
                .then(async (res) => {
                    await storageUtil.removeFile(res.imageUrl);
                    aboutInfo.imageUrl = req.files[0].path;
                });
        } else {
            delete aboutInfo.imageUrl;
        }
        return this.aboutService.updateAboutInfo(id, aboutInfo);
    }

    @hasRoles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteAboutInfo(@Param('id') id: string): Promise<AboutInfo> {
        const aboutInfoForDelete = await this.aboutService.getAboutImageUrl(id);
        await storageUtil.removeFile(aboutInfoForDelete.imageUrl);
        return this.aboutService.removeAboutInfo(id);
    }
}
