import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Participant, ParticipantSchema } from './schemas/participant.schema';
import { WorksItem, WorksItemSchema } from '../works/schemas/work.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Participant.name, schema: ParticipantSchema},
        {name: WorksItem.name, schema: WorksItemSchema}], 'master')
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService]
})
export class ParticipantsModule {}
