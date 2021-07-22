import { MultiLanguage } from '@shared/interfaces/common';

export interface NewsItem {
  title: MultiLanguage;
  text: MultiLanguage;
  date: Date;
  imageUrl: string;
}
