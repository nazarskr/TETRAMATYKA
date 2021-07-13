import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { Program, ProgramSchema } from './schemas/program.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Program.name, schema: ProgramSchema }], 'master'),
  ],
  providers: [ProgramService],
  controllers: [ProgramController],
})
export class ProgramModule {}
