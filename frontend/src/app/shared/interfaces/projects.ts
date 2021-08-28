import { MultiLanguage } from "@shared/interfaces/common";

export interface Project {
  _id?: string;
  title: MultiLanguage;
  description: MultiLanguage;
  imageUrl: string;
  createdAt?: Date;
}

export interface ProjectShort {
  _id?: string;
  title: MultiLanguage;
  imageUrl?: string;
}
