import { MultiLanguage } from '@shared/interfaces/common';

export interface ProgramItem {
  _id?: string;
  title: MultiLanguage;
  info: MultiLanguage;
  eventFullDate: string;
  editable?: boolean;
  showDay?: boolean;
}
