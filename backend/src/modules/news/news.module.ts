import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from "@nestjs/mongoose";
import { NewsItem, NewsItemSchema } from "./schemas/news-item.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: NewsItem.name, schema: NewsItemSchema}], 'master')
  ],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
