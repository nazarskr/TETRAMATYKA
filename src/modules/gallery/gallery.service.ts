import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GalleryImage, GalleryImageDocument } from './gallery.schema';
import { Model } from 'mongoose';
import { GalleryChaptersEnum } from './gallery.enum';
import { GalleryImageDto } from './gallery.dto';

@Injectable()
export class GalleryService {
    constructor(@InjectModel(GalleryImage.name) private galleryModel: Model<GalleryImageDocument>) {
    }

    async getAllGalleryForYearAndChapter(currentYear: number, chapter: GalleryChaptersEnum): Promise<GalleryImage[]> {
        return this.galleryModel.find({archiveYear: currentYear, chapter: chapter}).exec();
    }

    async addGalleryImages(galleryImageDtos: GalleryImageDto[]): Promise<any> {
        return galleryImageDtos.map(async (galleryImage: GalleryImageDto) => {
            const newGalleryImage = await new this.galleryModel(galleryImage);
            return newGalleryImage.save();
        });
    }

    async deleteGalleryImage(id: string): Promise<GalleryImage> {
        return this.galleryModel.findByIdAndRemove(id).exec();
    }

    async getGalleryImageUrl(id: string): Promise<GalleryImage> {
        return this.galleryModel.findById(id).select('imageUrl').exec();
    }
}
