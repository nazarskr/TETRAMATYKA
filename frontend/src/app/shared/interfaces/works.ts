import { MultiLanguage } from '@shared/interfaces/common';

export interface WorksItem {
  title: MultiLanguage;
  description: MultiLanguage;
  participants: string[];
  imageUrl?: string;
  archiveYear: number;
}

export interface WorksItemShort {
  _id: string;
  title: MultiLanguage;
}
