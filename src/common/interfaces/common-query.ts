import {GalleryChaptersEnum} from '../../modules/gallery/gallery.enum';

export interface ICommonQuery {
    year: string;
    childrenIds: string[];
    galleryChapter?: GalleryChaptersEnum;
}
