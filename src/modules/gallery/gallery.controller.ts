import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import {GalleryService} from './gallery.service';
import {MultipleImageUrlsInterceptor} from '../../common/interceptors/multiple-image-urls.interceptor';
import {ICommonQuery} from '../../common/interfaces/common-query';
import {GalleryImage} from './schema/gallery-image.schema';
import {storageUtil} from '../../common/utils/storage.util';
import {FilesInterceptor} from '@nestjs/platform-express';
import * as multerGoogleStorage from 'multer-google-storage';
import {GalleryImageDto} from './dto/gallery-image.dto';
import {IMulterRequest} from '../../common/interfaces/multer-custom';
import {GalleryChapter} from "./schema/gallery-chapter.schema";
import {hasRoles} from "../../common/decorators/roles.decorator";
import {RolesGuard} from "../../common/guards/roles.guard";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {ImageUrlInterceptor} from "../../common/interceptors/image-url.interceptor";

const GALLERY_FOLDER = 'gallery';
@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) {
    }

    @Get()
    @UseInterceptors(new MultipleImageUrlsInterceptor(300))
    getGalleryForChapterAndYear(@Query() query: ICommonQuery): Promise<GalleryImage[]> {
        return this.galleryService.getAllGalleryForYearAndChapter(+query.year, query.galleryChapter);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('images', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions(GALLERY_FOLDER))
    }))
    addGalleryImages(
        @Query() query: ICommonQuery,
        @Req() req: IMulterRequest): Promise<any> {
        const index = GALLERY_FOLDER.length + 20; // 2 * slash + year.length + timestamp length
        const modifiedDtos = req.files.map((item: any) => {
            const fileDto: GalleryImageDto = {
                title: item.filename.slice(index),
                archiveYear: +query.year,
                imageUrl:  item.path,
                chapter: query.galleryChapter
            };
            return fileDto;
        });
        return this.galleryService.addGalleryImages(modifiedDtos);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Delete(':id')
    async deleteGalleryImage(@Param('id') id: string): Promise<GalleryImage> {
        const itemForDelete = await this.galleryService.getGalleryImageUrl(id);
        await storageUtil.removeFile(itemForDelete.imageUrl);
        return this.galleryService.deleteGalleryImage(id);
    }

    @Get('chapters')
    @UseInterceptors(new MultipleImageUrlsInterceptor(300))
    getGalleryChapters(@Query() query: ICommonQuery): Promise<GalleryChapter[]> {
        return this.galleryService.getGalleryChapters(+query.year);
    }

    @Get('chapter/:id')
    @UseInterceptors(new ImageUrlInterceptor(300))
    getGalleryChapterById(@Param('id') id: string): Promise<GalleryChapter> {
        return this.galleryService.getGalleryChapterById(id);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Post('chapter')
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('gallery-chapter'))
    }))
    addGalleryChapter(
        @Body() body: any,
        @Query() query: ICommonQuery,
        @Req() req: IMulterRequest
    ) {
        const dto = JSON.parse(body.galleryChapter);
        dto.archiveYear = +query.year;
        dto.imageUrl = req.files[0].path;
        return this.galleryService.addGalleryChapter(dto);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Put('chapter/:id')
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('gallery-chapter'))
    }))
    async updateGalleryChapter(
        @Param('id') id: string,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<GalleryChapter> {
        const dto = JSON.parse(JSON.stringify(body.galleryChapter));
        if (req.files.length) {
            await this.galleryService.getGalleryChapterImageUrl(id)
                .then(async (res) => {
                    await storageUtil.removeFile(res.imageUrl);
                    dto.imageUrl = req.files[0].path;
                });
        } else {
            delete dto.imageUrl;
        }
        return this.galleryService.updateGalleryChapter(id, dto);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Delete('chapter/:id')
    async deleteGalleryChapter(@Param('id') id: string): Promise<GalleryChapter> {
        const itemForDelete = await this.galleryService.getGalleryChapterImageUrl(id);
        await storageUtil.removeFile(itemForDelete.imageUrl);
        return this.galleryService.deleteGalleryChapter(id);
    }
}
