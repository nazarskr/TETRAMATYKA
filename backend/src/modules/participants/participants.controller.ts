import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseInterceptors
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { Participant } from './schemas/participant.schema';
import { ParticipantDto } from './dto/participant.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ICommonQuery } from '../../common/interfaces/common-query';
import { IMulterRequest } from '../../common/interfaces/multer-custom';
import * as multerGoogleStorage from "multer-google-storage";
import { storageUtil } from "../../common/utils/storage.util";

@Controller('participants')
export class ParticipantsController {
    constructor(private readonly participantsService: ParticipantsService) {
    }

    @Get()
    getAllParticipants(@Query() query: ICommonQuery): Promise<Participant[]> {
        return this.participantsService.getAllParticipants(+query.year);
    }

    @Get('/short')
    getAllParticipantsShort(@Query() query: ICommonQuery): Promise<Participant[]> {
        return this.participantsService.getAllParticipantsShort(+query.year);
    }

    @Get(':id')
    getParticipantById(@Param('id') id: string): Promise<Participant> {
        return this.participantsService.getParticipantById(id);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('participants'))
    }))
    createParticipant(
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<Participant> {
        const participant: ParticipantDto = JSON.parse(body.participant);
        participant.archiveYear = +query.year;
        participant.imageUrl = req.files[0].path;
        return this.participantsService.createParticipant(participant);
    }

    @Put()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('participants'))
    }))
    async updateParticipant(
        @Param('id') id: string,
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<Participant> {
        const participant: ParticipantDto = JSON.parse(body.participant);
        if (req.files.length) {
            const previousUrl = participant.imageUrl;
            const folderName = `${query.year}/participants`;
            await storageUtil.removeFile(folderName, previousUrl);
            participant.imageUrl = req.files[0].path;
        }
        return this.participantsService.updateParticipant(id, participant);
    }

    @Delete(':id')
    deleteParticipant(@Param('id') id: string): Promise<Participant> {
        return this.participantsService.deleteParticipant(id);
    }
}
