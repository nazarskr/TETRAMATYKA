import {Body, Controller, Delete, Get, Param, Post, Query, Req, UseInterceptors} from '@nestjs/common';
import {GalleryService} from './gallery.service';
import {MultipleImageUrlsInterceptor} from '../../common/interceptors/multiple-image-urls.interceptor';
import {ICommonQuery} from '../../common/interfaces/common-query';
import {GalleryImage} from './gallery.schema';
import {storageUtil} from '../../common/utils/storage.util';
import {FilesInterceptor} from '@nestjs/platform-express';
import * as multerGoogleStorage from 'multer-google-storage';
import {GalleryImageDto} from './gallery.dto';
import {IMulterRequest} from '../../common/interfaces/multer-custom';

@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) {
    }

    @Get()
    @UseInterceptors(new MultipleImageUrlsInterceptor())
    getGalleryForChapterAndYear(@Query() query: ICommonQuery): Promise<GalleryImage[]> {
        return this.galleryService.getAllGalleryForYearAndChapter(+query.year, query.galleryChapter);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('gallery'))
    }))
    addGalleryImages(
        @Query() query: ICommonQuery,
        @Req() req: IMulterRequest): Promise<any> {
        const modifiedDto = req.files.map((item: any) => {
            const fileDto: GalleryImageDto = {
                title: item.filename,
                archiveYear: +query.year,
                imageUrl:  item.path,
                chapter: query.galleryChapter
            };
            return fileDto;
        });
        return this.galleryService.addGalleryImages(modifiedDto);
    }

    @Delete(':id')
    async deleteGalleryImage(@Param('id') id: string): Promise<GalleryImage> {
        const itemForDelete = await this.galleryService.getGalleryImageUrl(id);
        await storageUtil.removeFile(itemForDelete.imageUrl);
        return this.galleryService.deleteGalleryImage(id);
    }
}
