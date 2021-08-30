import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors} from '@nestjs/common';
import {WorksService} from './works.service';
import {MultipleImageUrlsInterceptor} from '../../common/interceptors/multiple-image-urls.interceptor';
import {ICommonQuery} from '../../common/interfaces/common-query';
import {WorksItem} from './schemas/work.schema';
import {ImageUrlInterceptor} from '../../common/interceptors/image-url.interceptor';
import {FilesInterceptor} from '@nestjs/platform-express';
import * as multerGoogleStorage from 'multer-google-storage';
import {storageUtil} from '../../common/utils/storage.util';
import {IMulterRequest} from '../../common/interfaces/multer-custom';
import {WorksItemDto} from './dto/works-item.dto';

@Controller('works')
export class WorksController {
    constructor(private readonly worksService: WorksService) {
    }

    @Get()
    @UseInterceptors(new MultipleImageUrlsInterceptor())
    getAllWorks(@Query() query: ICommonQuery): Promise<WorksItem[]> {
        return this.worksService.getAllWorks(+query.year);
    }

    @Get('/short')
    getAllWorksShort(@Query() query: ICommonQuery): Promise<WorksItem[]> {
        return this.worksService.getAllWorksShort(+query.year);
    }

    @Get(':id')
    @UseInterceptors(new ImageUrlInterceptor())
    getWorksItemById(@Param('id') id: string): Promise<WorksItem> {
        return this.worksService.getWorksItemById(id);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('works'))
    }))
    createWorksItem(
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<WorksItem> {
        const worksItem: WorksItemDto = JSON.parse(body.participant);
        worksItem.archiveYear = +query.year;
        worksItem.imageUrl = req.files[0].path;
        return this.worksService.createWorksItem(worksItem);
    }

    @Put(':id')
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('participants'))
    }))
    async updateWorksItem(
        @Param('id') id: string,
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<WorksItem> {
        const worksItem: WorksItemDto = JSON.parse(body.participant);
        if (req.files.length) {
            await this.worksService.getWorksItemImageUrl(id)
                .then(async (res) => {
                    await storageUtil.removeFile(res.imageUrl);
                    worksItem.imageUrl = req.files[0].path;
                });
        } else {
            delete worksItem.imageUrl;
        }
        return this.worksService.updateWorksItem(id, worksItem);
    }

    @Delete(':id')
    async deleteWorksItem(@Param('id') id: string): Promise<WorksItem> {
        const worksItemForDelete = await this.worksService.getWorksItemImageUrl(id);
        await storageUtil.removeFile(worksItemForDelete.imageUrl);
        return this.worksService.deleteWorksItem(id);
    }
}
