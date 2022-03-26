import {MultiLanguage} from '@shared/interfaces/common';

export interface GalleryImage {
  _id: string;
  imageUrl: string;
  title: string;
  archiveYear: number;
  url?: string;
  chapter?: string;
  displayPreview?: boolean;
  backgroundUrl?: string;
}

export interface GalleryChapter {
  _id?: string;
  title: MultiLanguage;
  imageUrl: string;
  archiveYear?: number;
}
