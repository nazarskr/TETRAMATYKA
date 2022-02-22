import {MultiLanguage} from '@shared/interfaces/common';

export interface GalleryImage {
  _id: string;
  imageUrl: string;
  title: string;
  archiveYear: number;
  url?: string;
}

export interface GalleryChapter {
  title: MultiLanguage;
  route: string;
  imageUrl: string;
  chapter: string;
  isActive?: boolean;
}
