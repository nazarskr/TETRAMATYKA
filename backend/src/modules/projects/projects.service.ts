import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Project, ProjectDocument } from "./schemas/project.schema";
import { Model } from "mongoose";
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {
    }

    async getAllProjects(currentYear: number): Promise<Project[]> {
        return this.projectModel.find({archiveYear: currentYear});
    }

    async getAllProjectsShort(currentYear: number): Promise<Project[]> {
        return this.projectModel.find({archiveYear: currentYear}, {description: 0, imageUrl: 0});
    }

    async getProjectById(id: string): Promise<Project> {
        return this.projectModel.findById(id);
    }

    async createProject(projectDto: ProjectDto): Promise<Project> {
        const newProject = new this.projectModel(projectDto);
        return newProject.save();
    }

    async updateProject(id: string, projectDto: ProjectDto): Promise<Project> {
        return this.projectModel.findByIdAndUpdate(id, projectDto, {new: false});
    }

    async removeProject(id: string): Promise<Project> {
        return this.projectModel.findByIdAndRemove(id);
    }

    async getProjectImageUrl(id: string): Promise<Project> {
        return this.projectModel.findById(id).select('imageUrl');
    }
}
