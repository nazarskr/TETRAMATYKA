import { Module } from '@nestjs/common';
import { FooterController } from './footer.controller';
import { FooterService } from './footer.service';

@Module({
  controllers: [FooterController],
  providers: [FooterService]
})
export class FooterModule {}
