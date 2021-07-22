import { MultiLanguage } from '@shared/interfaces/common';

export interface ProgramItem {
  title: MultiLanguage;
  location: MultiLanguage;
  content: MultiLanguage;
  eventDate: Date;
  eventType: EventType;
  imageUrl: string;
}

export interface EventType {
  name: MultiLanguage;
  color: string;
}
