import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { Participant } from './schemas/participant.schema';
import { ParticipantDto } from './dto/participant.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ICommonQuery } from '../../common/interfaces/common-query';

@Controller('participants')
export class ParticipantsController {
    constructor(private readonly participantsService: ParticipantsService) {
    }

    @Get()
    getAllParticipants(@Query() query: ICommonQuery): Promise<Participant[]> {
        return this.participantsService.getAllParticipants(+query.year);
    }

    @Get(':id')
    getParticipantById(@Param('id') id: string): Promise<Participant> {
        return this.participantsService.getParticipantById(id);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('image'))
    createParticipant(
        @Query() query: ICommonQuery,
        @UploadedFile() image: Express.Multer.File,
        @Body() body: any
    ): Promise<Participant> {
        const participant: ParticipantDto = JSON.parse(body.participant);
        participant.archiveYear = +query.year;
        return this.participantsService.createParticipant(participant);
    }

    @Put()
    @UseInterceptors(FilesInterceptor('image'))
    updateParticipant(
        @Param('id') id: string,
        @UploadedFile() image: Express.Multer.File,
        @Body() body: any
    ): Promise<Participant> {
        const participant: ParticipantDto = JSON.parse(body.participant);
        return this.participantsService.updateParticipant(id, participant);
    }

    @Delete(':id')
    deleteParticipant(@Param('id') id: string): Promise<Participant> {
        return this.participantsService.deleteParticipant(id);
    }
}
