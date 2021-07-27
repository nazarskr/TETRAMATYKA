import { IMultiLanguage } from '../../../common/interfaces/multi-language';

export class ParticipantDto {
    fullName: IMultiLanguage;
    bio: IMultiLanguage;
    imageUrl: string;
}
