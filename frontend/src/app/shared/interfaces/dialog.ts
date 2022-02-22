import { ParticipantShort } from '@shared/interfaces/participants';
import { UserProfile } from "@shared/interfaces/user";
import { GalleryChapter } from '@shared/interfaces/gallery';
import { MultiLanguage } from '@shared/interfaces/common';

export interface DialogData {
  title: string;
  message?: string;
  item?: any;
  checkboxText?: string;
  parentId?: string;
  participants?: ParticipantShort[];
  galleryHeader?: MultiLanguage;
  galleryChapter?: GalleryChapter;
}

export interface UserNameDialogData {
  title: string;
  profile: UserProfile;
}

export interface DialogResult {
  checkboxValue: boolean;
}
