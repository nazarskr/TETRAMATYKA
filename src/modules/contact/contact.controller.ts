import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactItem } from './schemas/contact.schema';
import { ContactItemDto } from './dto/contact.dto';
import { hasRoles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {
    }

    @Get()
    getAllContactItems(): Promise<ContactItem[]> {
        return this.contactService.getAllContactItems();
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Post()
    addContactItem(@Body() contactItemDto: ContactItemDto): Promise<ContactItem> {
        return this.contactService.addContactItem(contactItemDto);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Put(':id')
    updateContactItem(@Param('id') id: string, @Body() contactItemDto: ContactItemDto): Promise<ContactItem> {
        return this.contactService.updateContactItem(id, contactItemDto);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Patch()
    updatePositionIndexes(@Body() contactItemDtos: ContactItemDto[]): void {
        return this.contactService.updatePositionIndexes(contactItemDtos);
    }

    @hasRoles('ADMIN')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Delete(':id')
    removeContactItem(@Param('id') id: string): Promise<ContactItem> {
        return this.contactService.removeContactItem(id);
    }
}
