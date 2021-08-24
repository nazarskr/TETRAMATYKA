import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
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
        }
        return this.newsService.updateNewsItem(id, newsItem);
    }

    @Delete(':id')
    removeNewsItem(@Param('id') id: string): Promise<NewsItem> {
        return this.newsService.removeNewsItem(id);
    }
}
