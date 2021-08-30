import { IMultiLanguage } from '../../../common/interfaces/multi-language';
import { IParticipant } from '../../../common/interfaces/participant';

export class WorksItemDto {
    title: IMultiLanguage;
    description: IMultiLanguage;
    participants: IParticipant[];
    imageUrl: string;
    archiveYear: number;
}
