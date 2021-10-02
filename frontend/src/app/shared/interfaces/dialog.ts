import { ParticipantShort } from '@shared/interfaces/participants';
import { UserProfile } from "@shared/interfaces/user";

export interface DialogData {
  title: string;
  message?: string;
  item?: any;
  checkboxText?: string;
  parentId?: string;
  participants?: ParticipantShort[]
}

export interface UserNameDialogData {
  title: string;
  profile: UserProfile;
}

export interface DialogResult {
  checkboxValue: boolean;
}
