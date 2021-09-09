import { Module } from '@nestjs/common';
import { WorksController } from './works.controller';
import { WorksService } from './works.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorksItem, WorksItemSchema } from './schemas/work.schema';
import {Participant, ParticipantSchema} from '../participants/schemas/participant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: WorksItem.name, schema: WorksItemSchema},
        {name: Participant.name, schema: ParticipantSchema}], 'master')
  ],
  controllers: [WorksController],
  providers: [WorksService]
})
export class WorksModule {}
