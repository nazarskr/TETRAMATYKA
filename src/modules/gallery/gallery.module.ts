import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryImage, GallerySchema } from './gallery.schema';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
      CommonModule,
      MongooseModule.forFeature([{name: GalleryImage.name, schema: GallerySchema}], 'master')
  ],
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule {}
