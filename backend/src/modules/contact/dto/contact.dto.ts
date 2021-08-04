import { IMultiLanguage } from '../../../common/interfaces/multi-language';

export class ContactItemDto {
    _id?: string;
    title: IMultiLanguage;
    email: string;
    phone: string;
    positionIndex: number;
}
