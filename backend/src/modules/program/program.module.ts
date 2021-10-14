import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { ProgramItem, ProgramItemSchema } from './schemas/program.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from "../../common/common.module";

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: ProgramItem.name, schema: ProgramItemSchema }], 'master'),
  ],
  providers: [ProgramService],
  controllers: [ProgramController],
})
export class ProgramModule {}
