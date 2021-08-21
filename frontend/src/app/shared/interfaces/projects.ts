import { MultiLanguage } from "@shared/interfaces/common";

export interface Project {
  _id?: string;
  title: MultiLanguage;
  description: MultiLanguage;
  imageUrl: string;
  videoUrl?: string;
  editable?: boolean;
}
