import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutInfo } from './schemas/about-info.schema';
import { AboutInfoDto } from './dto/about-info.dto';
import {FilesInterceptor} from '@nestjs/platform-express';

@Controller('about')
export class AboutController {
    constructor (private readonly aboutService: AboutService) {
    }

    @Get()
    getAboutInfo(): Promise<AboutInfo[]> {
        return this.aboutService.getAboutInfo();
    }

    @Post()
    @UseInterceptors(FilesInterceptor('image'))
    addAboutInfo(@UploadedFile() image, @Body() body: AboutInfoDto): Promise<AboutInfo> {
        console.log(image);
        console.log(body);
        return this.aboutService.addAboutInfo(body);
    }

    @Put()
    @UseInterceptors(FilesInterceptor('image'))
    updateAboutInfo(@Param('id') id: string, @UploadedFile() image, @Body() body: AboutInfoDto): Promise<AboutInfo> {
       return this.aboutService.updateAboutInfo(id, body);
    }

    @Delete()
    removeAboutInfo(@Param('id') id: string): Promise<AboutInfo> {
        return this.aboutService.removeAboutInfo(id);
    }
}
