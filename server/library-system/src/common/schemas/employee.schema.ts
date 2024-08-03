import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Employee extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true, default: 'Librarist' })
  position: string;

  @Prop({ required: true })
  employmentDate: Date;

  @Prop({ required: true, default: 'USER' })
  role: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ unique: true })
  email: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
