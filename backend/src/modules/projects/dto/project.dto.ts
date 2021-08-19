import { IMultiLanguage } from '../../../common/interfaces/multi-language';

export class ProjectDto {
    title: IMultiLanguage;
    description: IMultiLanguage;
    imageUrl: string;
    videoUrl: string;
    archiveYear: number;
}
