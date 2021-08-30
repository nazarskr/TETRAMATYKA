import { Module } from '@nestjs/common';
import { WorksController } from './works.controller';
import { WorksService } from './works.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorksItem, WorksItemSchema } from './schemas/work.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: WorksItem.name, schema: WorksItemSchema}], 'master')
  ],
  controllers: [WorksController],
  providers: [WorksService]
})
export class WorksModule {}
