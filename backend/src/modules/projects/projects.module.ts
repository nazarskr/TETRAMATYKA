import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "./schemas/project.schema";
import { CommonModule } from "../../common/common.module";

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}], 'master')
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
