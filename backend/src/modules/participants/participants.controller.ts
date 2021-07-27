import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { Participant } from './schemas/participant.schema';
import { ParticipantDto } from './dto/participant.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('participants')
export class ParticipantsController {
    constructor(private readonly participantsService: ParticipantsService) {
    }

    @Get()
    getAllParticipants(): Promise<Participant[]> {
        return this.participantsService.getAllParticipants();
    }

    @Get(':id')
    getParticipantById(@Param('id') id: string): Promise<Participant> {
        return this.participantsService.getParticipantById(id);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('image'))
    createParticipant(@UploadedFile() image, @Body() participant: ParticipantDto): Promise<Participant> {
        console.log('post', image);
        return this.participantsService.createParticipant(participant);
    }

    @Put()
    @UseInterceptors(FilesInterceptor('image'))
    updateParticipant(@UploadedFile() image, @Param('id') id: string, @Body() participant: ParticipantDto): Promise<Participant> {
        console.log('put', image);
        return this.participantsService.updateParticipant(id, participant);
    }

    @Delete()
    deleteParticipant(@Param('id') id: string): Promise<Participant> {
        return this.participantsService.deleteParticipant(id);
    }
}
