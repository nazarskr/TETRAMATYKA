import { IMultiLanguage } from '../../../common/interfaces/multi-language';

export class ProgramItemDto {
    title: IMultiLanguage;
    info: IMultiLanguage;
    eventStartDate: Date;
    eventEndDate?: Date;
    archiveYear: number;
}
