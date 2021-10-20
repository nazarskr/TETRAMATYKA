import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req, UseGuards,
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
import {WorksItemDocument} from '../works/schemas/work.schema';
import {UpdateWriteOpResult} from 'mongoose';
import {hasRoles} from "../../common/decorators/roles.decorator";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesGuard} from "../../common/guards/roles.guard";

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

    @Get('/works-item')
    @UseInterceptors(new MultipleImageUrlsInterceptor())
    getParticipantsForWorksItem(@Query() query: ICommonQuery): Promise<Participant[]> {
        return this.participantsService.getParticipantsForWorksItem(query.childrenIds);
    }

    @Get(':id')
    @UseInterceptors(new ImageUrlInterceptor())
    getParticipantById(@Param('id') id: string): Promise<Participant> {
        return this.participantsService.getParticipantById(id);
    }

    // @hasRoles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('participants'))
    }))
    createParticipant(
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<WorksItemDocument> {
        const participant: ParticipantDto = JSON.parse(body.participant);
        participant.archiveYear = +query.year;
        participant.imageUrl = req.files[0].path;
        return this.participantsService.createParticipant(participant);
    }

    // @hasRoles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
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

    // @hasRoles('ADMIN')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteParticipant(@Param('id') id: string): Promise<UpdateWriteOpResult> {
        const participantForDelete = await this.participantsService.getParticipantImageUrl(id);
        await storageUtil.removeFile(participantForDelete.imageUrl);
        return this.participantsService.deleteParticipant(id).toPromise();
    }
}
