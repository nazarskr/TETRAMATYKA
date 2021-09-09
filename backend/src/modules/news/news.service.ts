import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { NewsItem, NewsItemDocument } from "./schemas/news-item.schema";
import { Model } from "mongoose";
import { NewsItemDto } from './dto/news-item.dto';

@Injectable()
export class NewsService {
    constructor(@InjectModel(NewsItem.name) private newsItemModel: Model<NewsItemDocument>) {
    }

    async getAllNews(currentYear: number): Promise<NewsItem[]> {
        return this.newsItemModel.find({archiveYear: currentYear})
            .sort({'eventDate': -1})
            .limit(3);
    }

    async getNewsItemById(id: string): Promise<NewsItem> {
        return this.newsItemModel.findById(id);
    }

    async createNewsItem(newsItemDto: NewsItemDto): Promise<NewsItem> {
        const newNewsItem = new this.newsItemModel(newsItemDto);
        return newNewsItem.save();
    }

    async updateNewsItem(id: string, newsItemDto: NewsItemDto): Promise<NewsItem> {
        return this.newsItemModel.findByIdAndUpdate(id, newsItemDto, {new: false});
    }

    async removeNewsItem(id: string): Promise<NewsItem> {
        return this.newsItemModel.findByIdAndRemove(id);
    }

    async getNewsItemImageUrl(id: string): Promise<NewsItem> {
        return this.newsItemModel.findById(id).select('imageUrl');
    }
}
