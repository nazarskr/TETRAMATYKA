import {GalleryChaptersEnum} from './gallery.enum';

export class GalleryImageDto {
    _id?: string;
    title: string;
    imageUrl: string;
    archiveYear: number;
    chapter: GalleryChaptersEnum;
}
