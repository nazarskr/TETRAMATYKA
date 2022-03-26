import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../../common/common.module';
import { GalleryImage, GalleryImageSchema } from './schema/gallery-image.schema';
import { GalleryChapter, GalleryChapterSchema } from "./schema/gallery-chapter.schema";

@Module({
  imports: [
      CommonModule,
      MongooseModule.forFeature([
          {name: GalleryImage.name, schema: GalleryImageSchema},
          {name: GalleryChapter.name, schema: GalleryChapterSchema},
      ], 'master')
  ],
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule {}
