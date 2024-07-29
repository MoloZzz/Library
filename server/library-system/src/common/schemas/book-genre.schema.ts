import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Book } from './book.schema';
import { Genre } from './genre.schema';

@Schema()
export class BookGenre extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Genre', required: true })
  genre: Genre;
}

export const BookGenreSchema = SchemaFactory.createForClass(BookGenre);
