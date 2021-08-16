import { MultiLanguage } from '@shared/interfaces/common';

export interface ProgramItem {
  _id?: string;
  title: MultiLanguage;
  info: MultiLanguage;
  eventStartDate: Date;
  eventEndDate?: Date;
  editable?: boolean;
  showDay?: boolean;
}
