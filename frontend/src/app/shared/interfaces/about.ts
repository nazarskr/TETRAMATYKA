import { MultiLanguage } from '@shared/interfaces/common';

export interface AboutInfo {
  _id?: string;
  text: MultiLanguage;
  imageUrl: string;
  image?: File;
}
