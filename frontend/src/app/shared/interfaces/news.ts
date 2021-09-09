import { MultiLanguage } from '@shared/interfaces/common';

export interface NewsItem {
  _id?: string;
  title: MultiLanguage;
  description: MultiLanguage;
  eventDate: Date;
  imageUrl: string;
}

export interface NewsItemShort {
  _id: string;
  title: MultiLanguage;
  createdAt: Date;
  imageUrl: string;
}
