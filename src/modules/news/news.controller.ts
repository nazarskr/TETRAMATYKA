import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import { NewsService } from "./news.service";
import { NewsItem } from './schemas/news-item.schema';
import { ICommonQuery } from '../../common/interfaces/common-query';
import { NewsItemDto } from './dto/news-item.dto';
import { FilesInterceptor } from "@nestjs/platform-express";
import * as multerGoogleStorage from "multer-google-storage";
import { IMulterRequest } from "../../common/interfaces/multer-custom";
import { storageUtil } from "../../common/utils/storage.util";
import {MultipleImageUrlsInterceptor} from '../../common/interceptors/multiple-image-urls.interceptor';
import {ImageUrlInterceptor} from '../../common/interceptors/image-url.interceptor';
import {hasRoles} from "../../common/decorators/roles.decorator";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesGuard} from "../../common/guards/roles.guard";

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {
    }

    @Get()
    @UseInterceptors(new MultipleImageUrlsInterceptor())
    getAllNews(@Query() query: ICommonQuery): Promise<NewsItem[]> {
        return this.newsService.getAllNews(+query.year);
    }

    @Get(':id')
    @UseInterceptors(new ImageUrlInterceptor())
    getNewsItemById(@Param('id') id: string): Promise<NewsItem> {
        return this.newsService.getNewsItemById(id);
    }

    // @hasRoles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('news'))
    }))
    createNewsItem(
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<NewsItem> {
       const newsItem: NewsItemDto = JSON.parse(body.newsItem);
       newsItem.archiveYear = +query.year;
       newsItem.imageUrl = req.files[0].path;
       return this.newsService.createNewsItem(newsItem);
    }

    // @hasRoles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('news'))
    }))
    async updateNewsItem(
        @Param('id') id: string,
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<NewsItem> {
        const newsItem: NewsItemDto = JSON.parse(body.newsItem);
        if (req.files.length) {
            await this.newsService.getNewsItemImageUrl(id)
                .then(async (res) => {
                    await storageUtil.removeFile(res.imageUrl);
                    newsItem.imageUrl = req.files[0].path;
                })
        } else {
            delete newsItem.imageUrl;
        }
        return this.newsService.updateNewsItem(id, newsItem);
    }

    // @hasRoles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteNewsItem(@Param('id') id: string): Promise<NewsItem> {
        const newsItemForDelete = await this.newsService.getNewsItemImageUrl(id);
        await storageUtil.removeFile(newsItemForDelete.imageUrl);
        return this.newsService.removeNewsItem(id);
    }
}
