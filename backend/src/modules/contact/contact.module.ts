import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactItem, ContactItemSchema } from './schemas/contact.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{name: ContactItem.name, schema: ContactItemSchema}], 'master')
  ],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
