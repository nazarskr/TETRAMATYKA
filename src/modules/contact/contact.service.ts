import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContactItem, ContactItemDocument } from './schemas/contact.schema';
import { Model } from 'mongoose';
import { ContactItemDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
    constructor(@InjectModel(ContactItem.name) private contactModel: Model<ContactItemDocument>) {
    }

    async getAllContactItems(): Promise<ContactItem[]> {
        return this.contactModel.find().sort('positionIndex');
    }

    async addContactItem(contactItemDto: ContactItemDto): Promise<ContactItem> {
        const newContactItem = new this.contactModel(contactItemDto);
        return newContactItem.save();
    }

    async updateContactItem(id: string, contactItemDto: ContactItemDto): Promise<ContactItem> {
        return this.contactModel.findByIdAndUpdate(id, contactItemDto, {new: false});
    }

    updatePositionIndexes(contactItemDtos: ContactItemDto[]): void {
        contactItemDtos.forEach(async (contactItem: ContactItemDto) => {
            const {_id, positionIndex} = contactItem;
            await this.contactModel.findByIdAndUpdate(_id, {$set: {positionIndex}});
        })
    }

    async removeContactItem(id: string): Promise<ContactItem> {
        return this.contactModel.findByIdAndRemove(id);
    }
}
