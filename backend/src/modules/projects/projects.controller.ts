import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from "./projects.service";
import { ICommonQuery } from '../../common/interfaces/common-query';
import { Project } from './schemas/project.schema';
import { ProjectDto } from './dto/project.dto';
import { FilesInterceptor } from "@nestjs/platform-express";
import * as multerGoogleStorage from "multer-google-storage";
import { IMulterRequest } from "../../common/interfaces/multer-custom";
import { storageUtil } from "../../common/utils/storage.util";
import { ImageUrlInterceptor } from '../../common/interceptors/image-url.interceptor';
import { MultipleImageUrlsInterceptor } from '../../common/interceptors/multiple-image-urls.interceptor';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {
    }

    @Get()
    @UseInterceptors(new MultipleImageUrlsInterceptor())
    getAllProjects(@Query() query: ICommonQuery): Promise<Project[]> {
        return this.projectsService.getAllProjects(+query.year);
    }

    @Get('/short')
    getAllProjectsShort(@Query() query: ICommonQuery): Promise<Project[]> {
        return this.projectsService.getAllProjectsShort(+query.year);
    }

    @Get(':id')
    @UseInterceptors(new ImageUrlInterceptor())
    getProjectById(@Param('id') id: string): Promise<Project> {
        return this.projectsService.getProjectById(id);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('projects'))
    }))
    createProject(
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<Project> {
        const project: ProjectDto = JSON.parse(body.project);
        project.archiveYear = +query.year;
        project.imageUrl = req.files[0].path;
        return this.projectsService.createProject(project);
    }

    @Put(':id')
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(storageUtil.createMulterOptions('projects'))
    }))
    async updateProject(
        @Param('id') id: string,
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<Project> {
        const project: ProjectDto = JSON.parse(body.project);
        if (req.files.length) {
            this.projectsService.getProjectImageUrl(id)
                .then(async (res) => {
                    await storageUtil.removeFile(res.imageUrl);
                    project.imageUrl = req.files[0].path;
                })
        } else {
            delete project.imageUrl;
        }
        return this.projectsService.updateProject(id, project);
    }

    @Delete(':id')
    async deleteProject(@Param('id') id: string): Promise<Project> {
        const projectForDelete = await this.projectsService.getProjectImageUrl(id);
        await storageUtil.removeFile(projectForDelete.imageUrl);
        return this.projectsService.removeProject(id);
    }
}
