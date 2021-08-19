import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Project, ProjectDocument } from "./schemas/project.schema";
import { Model } from "mongoose";

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {
    }
}
