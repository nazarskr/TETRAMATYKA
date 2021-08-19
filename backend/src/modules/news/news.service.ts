import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { NewsItem, NewsItemDocument } from "./schemas/news-item.schema";
import { Model } from "mongoose";

@Injectable()
export class NewsService {
    constructor(@InjectModel(NewsItem.name) private newsItemModel: Model<NewsItemDocument>) {
    }
}
