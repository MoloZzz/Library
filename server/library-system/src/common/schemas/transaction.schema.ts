import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Book } from './book.schema';
import { User } from './user.schema';
import { Employee } from './employee.schema';

@Schema()
export class Transaction extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  status: string;

  @Prop()
  comment: string;

  @Prop({ required: true })
  borrowDate: Date;

  @Prop()
  returnDate: Date;

  @Prop({ required: true })
  lastInteractionDate: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Employee', required: true })
  librarian: Employee;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
