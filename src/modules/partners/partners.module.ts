import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { CommonModule } from "../../common/common.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Partner, PartnerSchema } from "./schemas/partner.schema";

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      {name: Partner.name, schema: PartnerSchema}
    ], 'master')
  ],
  controllers: [PartnersController],
  providers: [PartnersService]
})
export class PartnersModule {}
