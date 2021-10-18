import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactItem, ContactItemSchema } from './schemas/contact.schema';
import { CommonModule } from "../../common/common.module";

@Module({
  imports: [
      CommonModule,
      MongooseModule.forFeature([{name: ContactItem.name, schema: ContactItemSchema}], 'master')
  ],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
