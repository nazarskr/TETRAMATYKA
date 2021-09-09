import { IMultiLanguage } from './multi-language';
import { IParticipant } from './participant';

export interface IWorksItem {
    title: IMultiLanguage;
    description: IMultiLanguage;
    participants: IParticipant[];
    imageUrl: string;
    archiveYear: number;
}
