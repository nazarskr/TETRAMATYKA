import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from "@nestjs/mongoose";
import { NewsItem, NewsItemSchema } from "./schemas/news-item.schema";
import { CommonModule } from "../../common/common.module";

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{name: NewsItem.name, schema: NewsItemSchema}], 'master')
  ],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
