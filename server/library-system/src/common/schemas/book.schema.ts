import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Genre } from './genre.schema';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  available: boolean;

  @Prop()
  isbn: string;

  @Prop()
  author: string;

  @Prop()
  publisher: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
