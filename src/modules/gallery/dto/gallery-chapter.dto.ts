import { IMultiLanguage } from "../../../common/interfaces/multi-language";

export class GalleryChapterDto {
    _id?: string;
    title: IMultiLanguage;
    imageUrl: string;
    archiveYear: number;
}