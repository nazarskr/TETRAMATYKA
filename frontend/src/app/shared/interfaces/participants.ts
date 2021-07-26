import { MultiLanguage } from '@shared/interfaces/common';

export interface ParticipantShort {
  _id: string;
  fullName: MultiLanguage;
}

export interface Participant {
  _id?: string;
  fullName: MultiLanguage;
  bio: MultiLanguage;
  imageUrl: string;
}
