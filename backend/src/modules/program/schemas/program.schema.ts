import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProgramDocument = Program & Document;

@Schema()
export class Program {
    @Prop()
    name: string;
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
