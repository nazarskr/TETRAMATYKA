import { MultiLanguage } from '@shared/interfaces/common';

export interface WorksItem {
  _id?: string;
  title: MultiLanguage;
  description: MultiLanguage;
  participants: string[];
  imageUrl?: string;
}

export interface WorksItemShort {
  _id: string;
  title: MultiLanguage;
}
