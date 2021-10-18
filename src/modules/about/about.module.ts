import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutInfo, AboutInfoSchema } from './schemas/about-info.schema';
import { CommonModule } from "../../common/common.module";

@Module({
  imports: [
      CommonModule,
      MongooseModule.forFeature([{name: AboutInfo.name, schema: AboutInfoSchema}], 'master')
  ],
  providers: [AboutService],
  controllers: [AboutController]
})
export class AboutModule {}
