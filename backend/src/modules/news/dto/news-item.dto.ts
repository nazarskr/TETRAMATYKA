import { IMultiLanguage } from '../../../common/interfaces/multi-language';

export class NewsItemDto {
    title: IMultiLanguage;
    description: IMultiLanguage;
    imageUrl: string;
    eventDate: Date;
    archiveYear: number;
}
