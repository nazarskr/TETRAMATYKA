import { ParticipantShort } from '@shared/interfaces/participants';

export interface DialogData {
  title: string;
  message?: string;
  item?: any;
  checkboxText?: string;
  parentId?: string;
  participants?: ParticipantShort[]
}

export interface DialogResult {
  checkboxValue: boolean;
}
