import { IMultiLanguage } from './multi-language';
import { IWorksItem } from './works-item';

export interface IParticipant {
    fullName: IMultiLanguage;
    bio: IMultiLanguage;
    works: IWorksItem[];
    imageUrl: string;
    archiveYear: number;
}
