import { MultiLanguage } from '@shared/interfaces/common';

export interface ProgramItem {
  _id?: string;
  title: MultiLanguage;
  info: MultiLanguage;
  eventFullDate: Date;
  editable?: boolean;
  showDay?: boolean;
}
