import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { ProgramItem, ProgramItemSchema } from './schemas/program.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProgramItem.name, schema: ProgramItemSchema }], 'master'),
  ],
  providers: [ProgramService],
  controllers: [ProgramController],
})
export class ProgramModule {}
