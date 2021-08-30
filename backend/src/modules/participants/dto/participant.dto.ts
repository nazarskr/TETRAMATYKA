import { IMultiLanguage } from '../../../common/interfaces/multi-language';
import { IWorksItem } from '../../../common/interfaces/works-item';

export class ParticipantDto {
    fullName: IMultiLanguage;
    bio: IMultiLanguage;
    works: IWorksItem[];
    imageUrl: string;
    archiveYear: number;
}
