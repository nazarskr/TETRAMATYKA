import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {GalleryImage, GalleryImageDocument} from './schema/gallery-image.schema';
import {Model} from 'mongoose';
import {GalleryImageDto} from './dto/gallery-image.dto';
import {GalleryChapter, GalleryChapterDocument} from "./schema/gallery-chapter.schema";
import {GalleryChapterDto} from "./dto/gallery-chapter.dto";

@Injectable()
export class GalleryService {
    constructor(
        @InjectModel(GalleryImage.name) private galleryImageModel: Model<GalleryImageDocument>,
        @InjectModel(GalleryChapter.name) private galleryChapterModel: Model<GalleryChapterDocument>
    ) {
    }

    async getAllGalleryForYearAndChapter(currentYear: number, chapterId: string): Promise<GalleryImage[]> {
        return this.galleryImageModel.find({archiveYear: currentYear, chapter: chapterId});
    }

    async addGalleryImages(galleryImageDtos: GalleryImageDto[]): Promise<any> {
        return galleryImageDtos.map(async (galleryImage: GalleryImageDto) => {
            const newGalleryImage = await new this.galleryImageModel(galleryImage);
            return newGalleryImage.save();
        });
    }

    async deleteGalleryImage(id: string): Promise<GalleryImage> {
        return this.galleryImageModel.findByIdAndRemove(id);
    }

    async getGalleryImageUrl(id: string): Promise<GalleryImage> {
        return this.galleryImageModel.findById(id).select('imageUrl');
    }

    async getGalleryChapters(currentYear: number): Promise<GalleryChapter[]> {
        return this.galleryChapterModel.find({archiveYear: currentYear});
    }

    async getGalleryChapterById(id: string): Promise<GalleryChapter> {
        return this.galleryChapterModel.findById(id);
    }

    async addGalleryChapter(galleryChapterDto: GalleryChapterDto): Promise<GalleryChapter> {
        const newGalleryChapter = await new this.galleryChapterModel(galleryChapterDto);
        return newGalleryChapter.save();
    }

    async updateGalleryChapter(id: string, galleryChapterDto: GalleryChapterDto): Promise<GalleryChapter> {
        return this.galleryChapterModel.findByIdAndUpdate(id, galleryChapterDto);
    }

    async getGalleryChapterImageUrl(id: string): Promise<GalleryChapter> {
        return this.galleryChapterModel.findById(id).select('imageUrl');
    }

    async deleteGalleryChapter(id: string): Promise<GalleryChapter> {
        return this.galleryChapterModel.findByIdAndRemove(id);
    }
}
