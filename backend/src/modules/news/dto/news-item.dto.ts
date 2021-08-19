import { IMultiLanguage } from '../../../common/interfaces/multi-language';

export class NewsItemDto {
    title: IMultiLanguage;
    description: IMultiLanguage;
    imageUrl: string;
    createdAt: Date;
    archiveYear: number;
}
