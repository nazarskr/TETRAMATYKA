import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NewsService } from "./news.service";
import { NewsItem } from './schemas/news-item.schema';
import { ICommonQuery } from '../../common/interfaces/common-query';
import { NewsItemDto } from './dto/news-item.dto';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {
    }

    @Get()
    getAllNews(@Query() query: ICommonQuery): Promise<NewsItem[]> {
        return this.newsService.getAllNews(+query.year);
    }

    @Get(':id')
    getNewsItemById(@Param('id') id: string): Promise<NewsItem> {
        return this.newsService.getNewsItemById(id);
    }

    @Post()
    createNewsItem(@Body() body: any): Promise<NewsItem> {
       const newsItem: NewsItemDto = JSON.parse(body);
       return this.newsService.createNewsItem(newsItem);
    }

    @Put(':id')
    updateNewsItem(@Param('id') id: string, @Body() body: any): Promise<NewsItem> {
        const newsItem: NewsItemDto = JSON.parse(body);
        return this.newsService.updateNewsItem(id, newsItem);
    }

    @Delete(':id')
    removeNewsItem(@Param('id') id: string): Promise<NewsItem> {
        return this.newsService.removeNewsItem(id);
    }
}
