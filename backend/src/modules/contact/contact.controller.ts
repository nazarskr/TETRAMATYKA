import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactItem } from './schemas/contact.schema';
import { ContactItemDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {
    }

    @Get()
    getAllContactItems(): Promise<ContactItem[]> {
        return this.contactService.getAllContactItems();
    }

    @Post()
    addContactItem(@Body() contactItemDto: ContactItemDto): Promise<ContactItem> {
        return this.contactService.addContactItem(contactItemDto);
    }

    @Put(':id')
    updateContactItem(@Param('id') id: string, @Body() contactItemDto: ContactItemDto): Promise<ContactItem> {
        return this.contactService.updateContactItem(id, contactItemDto);
    }

    @Patch()
    updatePositionIndexes(@Body() contactItemDtos: ContactItemDto[]): void {
        return this.contactService.updatePositionIndexes(contactItemDtos);
    }

    @Delete()
    removeContactItem(id: string): Promise<ContactItem> {
        return this.contactService.removeContactItem(id);
    }
}
