import { IMultiLanguage } from '../../../common/interfaces/multi-language';

export class ProgramDto {
    title: IMultiLanguage;
    info: IMultiLanguage;
    eventFullDate: Date;
    archiveYear: number;
}
