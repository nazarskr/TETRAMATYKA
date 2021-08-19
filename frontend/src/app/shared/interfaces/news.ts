import { MultiLanguage } from '@shared/interfaces/common';

export interface NewsItem {
  _id: string;
  title: MultiLanguage;
  description: MultiLanguage;
  date: Date;
  imageUrl: string;
}
