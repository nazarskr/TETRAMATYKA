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
import { ImageUrlInterceptor } from '../../common/interceptors/image-url.interceptor';
import { MultipleImageUrlsInterceptor } from '../../common/interceptors/multiple-image-urls.interceptor';

@Controller('participants')
export class ParticipantsController {
    constructor(private readonly participantsService: ParticipantsService) {
    }

    @Get()
    @UseInterceptors(new MultipleImageUrlsInterceptor())
    getAllParticipants(@Query() query: ICommonQuery): Promise<Participant[]> {
        return this.participantsService.getAllParticipants(+query.year);
    }

    @Get('/short')
    getAllParticipantsShort(@Query() query: ICommonQuery): Promise<Participant[]> {
        return this.participantsService.getAllParticipantsShort(+query.year);
    }

    @Get(':id')
    @UseInterceptors(new ImageUrlInterceptor())
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

    @Put(':id')
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
            await this.participantsService.getParticipantImageUrl(id)
                .then(async (res) => {
                    await storageUtil.removeFile(res.imageUrl);
                    participant.imageUrl = req.files[0].path;
                });
        } else {
            delete participant.imageUrl;
        }
        return this.participantsService.updateParticipant(id, participant);
    }

    @Delete(':id')
    async deleteParticipant(@Param('id') id: string): Promise<Participant> {
        const participantForDelete = await this.participantsService.getParticipantImageUrl(id);
        await storageUtil.removeFile(participantForDelete.imageUrl);
        return this.participantsService.deleteParticipant(id);
    }
}
