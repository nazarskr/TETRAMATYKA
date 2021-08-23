import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors} from '@nestjs/common';
import { ProjectsService } from "./projects.service";
import { ICommonQuery } from '../../common/interfaces/common-query';
import { Project } from './schemas/project.schema';
import { ProjectDto } from './dto/project.dto';
import {FilesInterceptor} from "@nestjs/platform-express";
import * as multerGoogleStorage from "multer-google-storage";
import {createMulterOptions} from "../../common/config/multer.config";
import {IMulterRequest} from "../../common/interfaces/multer-custom";
import {storageUtil} from "../../common/utils/storage.util";

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {
    }

    @Get()
    getAllNews(@Query() query: ICommonQuery): Promise<Project[]> {
        return this.projectsService.getAllProjects(+query.year);
    }

    @Get(':id')
    getNewsItemById(@Param('id') id: string): Promise<Project> {
        return this.projectsService.getProjectById(id);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(createMulterOptions('projects'))
    }))
    createNewsItem(
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<Project> {
        const project: ProjectDto = JSON.parse(body);
        project.archiveYear = +query.year;
        project.imageUrl = req.files[0].path;
        return this.projectsService.createProject(project);
    }

    @Put(':id')
    @UseInterceptors(FilesInterceptor('image', null, {
        storage: multerGoogleStorage.storageEngine(createMulterOptions('projects'))
    }))
    async updateNewsItem(
        @Param('id') id: string,
        @Query() query: ICommonQuery,
        @Body() body: any,
        @Req() req: IMulterRequest
    ): Promise<Project> {
        const project: ProjectDto = JSON.parse(body);
        if (req.files.length) {
            const previousUrl = project.imageUrl;
            const folderName = `${query.year}/projects`;
            await storageUtil.removeFile(folderName, previousUrl);
            project.imageUrl = req.files[0].path;
        }
        return this.projectsService.updateProject(id, project);
    }

    @Delete(':id')
    removeNewsItem(@Param('id') id: string): Promise<Project> {
        return this.projectsService.removeProject(id);
    }
}
