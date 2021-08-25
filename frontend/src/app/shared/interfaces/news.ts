import { MultiLanguage } from '@shared/interfaces/common';

export interface NewsItem {
  _id?: string;
  title: MultiLanguage;
  description: MultiLanguage;
  createdAt: Date;
  imageUrl: string;
}

export interface NewsItemShort {
  _id: string;
  title: MultiLanguage;
  createdAt: Date;
  imageUrl: string;
}
