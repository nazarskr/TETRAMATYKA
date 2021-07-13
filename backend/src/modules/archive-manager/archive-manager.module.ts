import { Module } from '@nestjs/common';
import { ArchiveManagerController } from './archive-manager.controller';
import { ArchiveManagerService } from './archive-manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchiveYear, ArchiveYearSchema } from './schemas/archive-year.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ArchiveYear.name, schema: ArchiveYearSchema }], 'master'),
  ],
  controllers: [ArchiveManagerController],
  providers: [ArchiveManagerService],
})
export class ArchiveManagerModule {}
