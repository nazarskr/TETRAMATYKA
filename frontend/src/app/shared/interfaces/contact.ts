import { MultiLanguage } from '@shared/interfaces/common';

export interface Contact {
  _id?: string;
  title: MultiLanguage;
  email: string;
  phone: string;
  positionIndex: number;
  editable?: boolean;
}
