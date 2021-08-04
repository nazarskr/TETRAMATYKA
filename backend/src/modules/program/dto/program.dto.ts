import { IMultiLanguage } from '../../../common/interfaces/multi-language';

export class ProgramItemDto {
    title: IMultiLanguage;
    info: IMultiLanguage;
    eventFullDate: Date;
    archiveYear: number;
}
