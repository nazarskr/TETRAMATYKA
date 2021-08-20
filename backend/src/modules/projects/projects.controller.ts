import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectsService } from "./projects.service";
import { ICommonQuery } from '../../common/interfaces/common-query';
import { Project } from './schemas/project.schema';
import { ProjectDto } from './dto/project.dto';

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
    createNewsItem(@Body() body: any): Promise<Project> {
        const project: ProjectDto = JSON.parse(body);
        return this.projectsService.createProject(project);
    }

    @Put(':id')
    updateNewsItem(@Param('id') id: string, @Body() body: any): Promise<Project> {
        const project: ProjectDto = JSON.parse(body);
        return this.projectsService.updateProject(id, project);
    }

    @Delete(':id')
    removeNewsItem(@Param('id') id: string): Promise<Project> {
        return this.projectsService.removeProject(id);
    }
}
